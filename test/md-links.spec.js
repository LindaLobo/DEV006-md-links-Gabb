const { mdLinks } = require('../index.js');
const { default: axios } = require("axios");
const { readAllPath } = require("../funciones.js");

describe('mdLinks', () => {
  it('Debería retornar los enlaces con validacion false', () => {
    const miNewPromise = Promise.resolve([
      {
        href: 'https://example.com',
        text: 'Example',
        file: '/path/to/file.md'
      },
      {
        href: 'https://example2.com',
        text: 'Example 2',
        file: '/path/to/file.md'
      }
    ]);

    const options = { validate: false };

    return mdLinks(miNewPromise, options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://example.com',
            text: 'Example',
            file: '/path/to/file.md'
          },
          {
            href: 'https://example2.com',
            text: 'Example 2',
            file: '/path/to/file.md'
          }
        ]);
      });
  });

  it('Debería retornar los enlaces con validación true', () => {
    const miNewPromise = Promise.resolve([
      {
        href: 'https://example.com',
        text: 'Example',
        file: '/path/to/file.md',
        status: 200,
        ok: 'ok'
      }
    ]);

    const options = { validate: true };

    return mdLinks(miNewPromise, options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://example.com',
            text: 'Example',
            file: '/path/to/file.md',
            status: 200,
            ok: 'ok'
          },
        ]);
      });
  });

  it('Debería retornar los enlaces con validación true con axios', () => {
    const miNewPromise = Promise.resolve([
      {
        href: 'https://example.com',
        text: 'Example',
        file: '/path/to/file.md',
        status: 200,
        ok: 'ok'
      }
    ]);
  
    const options = { validate: true };
  
    // const axiosMock = {
    //   get: jest.fn().mockResolvedValue({
    //     status: 200,
    //     statusText: 'ok'
    //   })
    // };

    axios.get = jest.fn(
      function () {
        const miNewPromise = Promise.resolve({
          status : 200,
          statusText : 'OK'
        })
        return miNewPromise
      }
    ) 
    const spy = jest.spyOn(axios, "get")

  
    return mdLinks(miNewPromise, options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://example.com',
            text: 'Example',
            file: '/path/to/file.md',
            status: 200,
            ok: 'ok'
          }
        ]);
        expect(spy).toHaveBeenCalledWith('https://example.com');
      });
  });
  

  it('Debería rechazar la promesa si ocurre un error en miPromesa', () => {
    const miNewPromise = Promise.reject('Ocurrió un error en miPromesa');
    const options = { validate: true };
  
    return mdLinks(miNewPromise, options)
      .catch((error) => {
        expect(error).toBe('Ocurrió un error en miPromesa');
      });
  });

  it('Debería retornar los enlaces sin validación si no se proporciona la opción "validate"', () => {
    const miNewPromise = Promise.resolve([
      {
        href: 'https://example.com',
        text: 'Example',
        file: '/path/to/file.md'
      }
    ]);
  
    const options = {}; // No se proporciona la opción "validate"
  
    return mdLinks(miNewPromise, options)
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://example.com',
            text: 'Example',
            file: '/path/to/file.md'
          }
        ]);
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

