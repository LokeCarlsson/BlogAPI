import initializeDb from './db'
import bodyParser 	from 'body-parser'
import middleware 	from './middleware'
import express 			from 'express'
import config 			from './config.json'
import morgan 			from 'morgan'
import http 				from 'http'
import cors 				from 'cors'
import api 					from './api'

let app = express()
app.server = http.createServer(app)

app.use(morgan('dev'))

app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
	limit : config.bodyLimit
}))

initializeDb( db => {

	app.use(middleware({ config, db }))

	app.use('/api', api({ config, db }))

	app.server.listen(process.env.PORT || config.port)

	console.log(`Started on port ${app.server.address().port}`)
})

export default app
