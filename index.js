const { miPromesa } = require("./funciones.js");
const { default: axios } = require("axios");

const mdLinks = (options) => {
  return new Promise((resolver, rechazar) => {
    let file = options.path;
    miPromesa(file)
      .then((links) => {
        if (options && options.validate) {
          const linkPromises = links.map((link) =>
            axios
              .get(link.href)
              .then((response) => {
                link.status = response.status;
                link.ok = response.statusText === "OK" ? "ok" : "fail";
                return link;
              })
              .catch((error) => {
                link.status = error.response ? error.response.status : 404;
                link.ok = "fail";
                return link;
              })
          );

          Promise.all(linkPromises)
            .then((updatedLinks) => {
              resolver(updatedLinks);
            })
            .catch((error) => {
              rechazar(error);
            });
        } else {
          resolver(links);
        }
      })
      .catch((error) => {
        rechazar(error);
      });
  });
};

module.exports = { mdLinks };
