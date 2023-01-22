import Fastify from 'fastify'
import cors from '@fastify/cors'
import formBody from "@fastify/formbody"
import userRoutes from './routes/userRoutes.js'

// El logger en true muestra la info de las peticiones
const fastify = Fastify({
  logger: true
})

// Utilizar y modificar los pluggins
fastify.register(cors, {origin: "*"})
fastify.register(formBody)

// Utilizar las rutas
fastify.register(userRoutes, {prefix: "/usuarios"});


// Inicializar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 4000 , host: "0.0.0.0"})
    console.log("El puerto está escuchando por el puerto 4000")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()