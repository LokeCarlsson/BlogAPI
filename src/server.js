import bodyParser 	from 'body-parser'
import express 			from 'express'
import config 			from './config/main'
import router 			from './router'
import contentType  from './middlewares/contentType'
import headers			from './middlewares/headers'
// import morgan 			from 'morgan'
import http 				from 'http'
import cors 				from 'cors'
import mongoose			from 'mongoose'
import bluebird			from 'bluebird'

let app = express()
app.server = http.createServer(app)

mongoose.Promise = bluebird
mongoose.connect(config.database)

// app.use(morgan('dev', {
//   skip: => (req, res) { return res.statusCode < 400 }
// }))

app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(headers)
app.use('*', contentType)

router(app)

app.server.listen(config.port || 3000, () => {
	console.log('Server listening on port ', config.port)
})

export default app
