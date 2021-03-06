import express from 'express'
import bodyParser from 'body-parser'
import api from './api'

const router = express.Router()

router.use(bodyParser.json())

router.use((request, response, next) => {
    console.log(`${request.method} Received: ${JSON.stringify({
        path: request.path,
        body: request.body
    })}`)
    next()
})

// Add real endpoints here
router.use('/api', api)

// End of pipeline
router.use((request, response) => {
    let message = `Unknown API Endpoint: ${request.path}`
    response.json({
        status: 404,
        body: message
    })
})

// error handler
router.use((error, request, response) => {
   response.json(error)
})

const port = 8000
express().use(router).listen(port, () => {
    //console.log(`Starting app in environment: ${JSON.stringify(process.env, null, 2)}`)
    console.log(`listening on port ${port}`)
})
