
const urlApi = process.env.NODE_ENV ===  'development' ? 'http://localhost:2000' : 'https://routingapi.herokuapp.com'

exports.urlApi = urlApi

