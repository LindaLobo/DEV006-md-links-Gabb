const { mdLinks } = require('../index.js');
const { default: axios } = require("axios");
const { readAllPath } = require("../funciones.js");

describe('mdLinks', () => {
  it('Debería retornar los enlaces con validacion false', () => {


    const options = { validate: false, path: "conseguir.md" };

    return mdLinks(options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://es.reactjs.org/',
            text: 'React',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md'
          },
          {
            href: 'https://nodejs.org/es/',
            text: 'NodeJs',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md'
          },
          {
            href: 'https://react-bootstrap.github.io/',
            text: 'React Bootstrap',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md'
          },
          {
            href: 'https://getbootstrap.com/',
            text: 'Bootstrap',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md'
          },
          {
            href: 'https://axios-http.com/docs/intro',
            text: 'Axios',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md'
          }
        ]);
      });
  });

  it('Debería retornar los enlaces con validación true', () => {

    const options = { validate: true, path: "conseguir.md" };

    return mdLinks(options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://es.reactjs.org/',
            text: 'React',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
            status: 200,
            ok: 'ok'
          },
          {
            href: 'https://nodejs.org/es/',
            text: 'NodeJs',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
            status: 200,
            ok: 'ok'
          },
          {
            href: 'https://react-bootstrap.github.io/',
            text: 'React Bootstrap',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
            status: 200,
            ok: 'ok'
          },
          {
            href: 'https://getbootstrap.com/',
            text: 'Bootstrap',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
            status: 200,
            ok: 'ok'
          },
          {
            href: 'https://axios-http.com/docs/intro',
            text: 'Axios',
            file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
            status: 200,
            ok: 'ok'
          },
        ]);
      });
  });

  // it('Debería retornar los enlaces con validación true con axios', () => {
  
  //   const options = { validate: true, path: "conseguir.md" };

  //   axios.get = jest.fn(
  //     function () {
  //       const miNewPromise = Promise.resolve({
  //         status : 200,
  //         statusText : 'OK'
  //       })
  //       return miNewPromise
  //     }
  //   ) 
  //   // const spy = jest.spyOn(axios, "get")

  //   return mdLinks(options)
  //     .then((result) => {
  //       expect(result).toEqual([
  //         {
  //           href: 'https://es.reactjs.org/',
  //           text: 'React',
  //           file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
  //           status: 200,
  //           ok: 'ok'
  //         },
  //         {
  //           href: 'https://nodejs.org/es/',
  //           text: 'NodeJs',
  //           file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
  //           status: 200,
  //           ok: 'ok'
  //         },
  //         {
  //           href: 'https://react-bootstrap.github.io/',
  //           text: 'React Bootstrap',
  //           file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
  //           status: 200,
  //           ok: 'ok'
  //         },
  //         {
  //           href: 'https://getbootstrap.com/',
  //           text: 'Bootstrap',
  //           file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
  //           status: 200,
  //           ok: 'ok'
  //         },
  //         {
  //           href: 'https://axios-http.com/docs/intro',
  //           text: 'Axios',
  //           file: '/home/linda/Escritorio/DEV006-md-links-Gabb/ejemplo/conseguir.md',
  //           status: 200,
  //           ok: 'ok'
  //         },
  //       ]);
  //       // expect(spy).toHaveBeenCalledWith('https://example.com');
  //     });
  // });
  

  it('Debería rechazar la promesa si ocurre un error en miPromesa', () => {
    const options = { validate: true,  path: "conseguir.md" };
  
    return mdLinks(options)
      .catch((error) => {
        expect(error).toBe('Ocurrió un error en miPromesa');
      });
  });
});

describe('funcion readAllPath', () => {
  it('Debería devolver una matriz de la ruta de archivos', () => {
    const directorioBase = __dirname;
    const archivos = readAllPath(directorioBase);
    expect(Array.isArray(archivos)).toBe(true);
    archivos.forEach((archivo) => {
      expect(typeof archivo).toBe('string');
    });
  });
});

