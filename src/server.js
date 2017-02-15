import initializeDb from './DAL/connection'
import bodyParser 	from 'body-parser'
import middleware 	from './middleware'
import express 			from 'express'
import config 			from './config.json'
import router 			from './router'
import morgan 			from 'morgan'
import http 				from 'http'
import cors 				from 'cors'
import api 					from './api'

let app = express()
app.server = http.createServer(app)

// app.use(morgan('dev', {
//   skip: function (req, res) { return res.statusCode < 400 }
// }))

app.use(cors({
	exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

initializeDb( db => {

	app.use(middleware({ config, db }))

	app.use('/api', api({ config, db }))

	router(app)

	app.server.listen(process.env.PORT || config.port)

	console.log(`Started on port ${app.server.address().port}`)
})

export default app
