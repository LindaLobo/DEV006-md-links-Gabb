const {mdLinks} = require('./index.js')
const validar = Boolean(process.argv[2])
const archivo = process.argv[3]

const options = {validate:validar, path:archivo}
console.log(options)
mdLinks(options)
    .then((result)=>{
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })