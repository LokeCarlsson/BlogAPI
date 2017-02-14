import mongoose from 'mongoose'

const db = 'mongodb://localhost/test'

mongoose.connect(db)

mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ', db)
})

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	callback()
}
