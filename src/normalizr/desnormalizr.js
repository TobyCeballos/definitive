
const { denormalize, schema } = require('normalizr')

const util = require('util')

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' })

const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })

const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })



function print(objecto) {
    console.log(util.inspect(objecto, false, 12, true));
}


module.exports = async function denormalizedList(mensajesNormalizados) {
    console.log(mensajesNormalizados)
    let listLength = JSON.stringify(mensajesNormalizados).length
    console.log(listLength)

    let listDenormalize = denormalize(mensajesNormalizados.result, schemaMensajes, mensajesNormalizados.entities)
    console.log(listDenormalize)
    let listDenormalizeSize = JSON.stringify(listDenormalize).length

    console.log(listDenormalize, listDenormalizeSize)

    let percent = parseInt((listLength * 100) / listDenormalizeSize)

    console.log(`Porcentaje de compresion del ${percent}%`)

    return print(listDenormalize)
}


