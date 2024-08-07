import express from 'express'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import router from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conexión exitosa a la DB'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("Hubo un error al conectar la base de datos"))
    }
}

connectDB()

// Instancia de Express
const server = express()

// Leer datos de formulario
server.use(express.json())

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server