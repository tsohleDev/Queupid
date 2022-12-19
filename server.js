var http = require('http')

function onRequest(request, response) {
    response.writeHead(200, {'content-type': 'text/plain'})
    response.write('Hello World')
    response.end()
}

http.createServer(onRequest).listen(8000)