import express from 'express'

const server = express()

// Routing
server.get('/', (req, res) => {

    const auth = true

    res.json(auth)
});

export default server