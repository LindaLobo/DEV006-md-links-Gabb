const fs = require("fs");
const path = require("path");
const readline = require("readline");
const regexEnlaces = /\[.*?\]\((.*?)\)/g;

// extraer todos los archivos incluyendo subarchivos
const readAllPath = (directorio, archivos = []) => {
  const listaArchivos = fs.readdirSync(directorio);
  listaArchivos.forEach((archivo) => {
    const rutaArchivo = path.join(directorio, archivo);
    const stat = fs.statSync(rutaArchivo);
    if (stat.isFile()) {
      archivos.push(rutaArchivo);
    } else if (
      stat.isDirectory() &&
      archivo !== "node_modules" &&
      archivo !== ".git"
    ) {
      readAllPath(rutaArchivo, archivos); // Llamada recursiva para subdirectorios
    }
  });
  return archivos;
};

// promesa donde leo mis links
let miPromesa = (file) => {
  const directorioBase = __dirname.includes(path.resolve("node_modules"))
    ? path.dirname(path.dirname(__dirname))
    : __dirname;
  console.log(directorioBase);
  const archivosEncontrados = readAllPath(directorioBase);
  const rutaArchivo = archivosEncontrados.find((ruta) => {
    const nombreArchivo = ruta.split("/").pop();
    return nombreArchivo === file;
  });
  return new Promise((resolver, rechazar) => {
    if (path.extname(rutaArchivo) === ".md") {
      // resolver("se leyo correctamente el archivo");
      fs.readFile(rutaArchivo, "utf-8", (error, result) => {
        if (error) {
          console.log(error);
          rechazar("no se leyo correctamente el archivo o no es md");
        }
        const links = [];
        let lector = readline.createInterface({
          input: fs.createReadStream(rutaArchivo),
        });
        lector.on("line", (linea) => {
          const enlaces = linea.match(regexEnlaces);
          if (enlaces) {
            enlaces.forEach((enlace) => {
              const url = enlace.match(/\((.*?)\)/)[1];
              const textos = enlaces[0].match(/\[(.*?)\]/)[1];
              // console.log(url);
              const objeto = {
                href: url,
                text: textos,
                file: rutaArchivo,
              };
              links.push(objeto);
            });
          }
        });
        lector.on("close", () => {
          resolver(links);
        });
      });
    } else {
      rechazar("no se leyo correctamente el archivo o no es md");
      console.log("no se leyo correctamente el archivo o no es md");
    }
  });
};

module.exports = { miPromesa, readAllPath };
