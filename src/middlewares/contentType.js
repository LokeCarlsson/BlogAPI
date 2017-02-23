export default (req, res, next) => {
	const contype = req.headers['content-type']
	if (!contype || contype.indexOf('application/json') !== 0)
	return res.status(400).send('The only content-type that is allowed is application/json')
	next()
}
