const Contenedor = require('../controllers/contenedorMsg')

const { normalize, schema } = require('normalizr')

const util = require('util')

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'id' })

const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })

const schemaMensajes = new schema.Entity('mensajes', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarArray = (messagesWithId) => normalize(messagesWithId, schemaMensajes)



function print(objecto) {
  console.log(util.inspect(objecto, false, 12, true));
}


async function normalizedList() {
  const arrayMensajes = await Contenedor.getMsg()
  const normalizedArray = normalizarArray({ id: 'mensajes', arrayMensajes })
  return print(normalizedArray)
}


module.exports = normalizedList()