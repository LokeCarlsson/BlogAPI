export default (req, res, next) => {
	const contype = req.headers['content-type']
	if (!contype || contype.indexOf('application/json') !== 0)
	return res.send(400)
	next()
}
