const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//import mongoDB driver
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

//connection string
const MONGO_URL = 'mongodb://localhost:27017'

//create a client - pool
const mongoClient = new MongoClient(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const app = express()

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

app.use(morgan('combined'))
app.use(cors())

//GET /countries
app.get('/countries', (req, resp) => {
    mongoClient.db('winemag')
        .collection('wine')
        .distinct('country')
        .then(results => {
            console.log('countries', results)
            //to make it reverse --> results.reverse()
            resp.status(200).json(results)
        })
        .catch(e => {
            console.error(e)
            resp.status(500).json({error: e})
        })
})

//GET /country/:country
app.get('/country/:country', (req, resp) => {
    const country = req.params['country']
    const offset = parseInt(req.query['offset'])
    console.log('offset', offset)
    mongoClient.db('winemag')
        .collection('wine')
        .find({
            country: {
                $regex: country,
                $options: 'i'
            }
        })
        .sort({province: 1})
        .skip(offset)
        .limit(20)
        .project({title:1, price:1})
        .sort({title: 1})
        .toArray()
        .then(results => {
            console.log('results', results)
            resp.status(200).json(results)
        })
        .catch(e => {
            console.log('error', error)
            resp.status(500).json({error: e})
        })    
})

//GET /wine/:id
app.get('/wine/:id', (req, resp) => {
    const id = req.params['id']
    mongoClient.db('winemag')
        .collection('wine')
        .find({
            _id: ObjectId(`${id}`)
        })
        .project({country:1, description:1, points:1, price:1, title:1, variety:1, winery:1})
        .toArray()
        .then(results => {
            console.log('wines', results)
            resp.status(200).json(results)
        })
        .catch(e => {
            console.log('error', e)
            resp.status(500).json({error: e})
        })
})

mongoClient.connect()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`Application started at PORT ${PORT} at ${new Date()}`)
        })
    })
    .catch(e => {
        console.error('Cannot connect to mongodb')
    })
