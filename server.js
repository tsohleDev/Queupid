const http = require("http")
const fs = require("fs");

http.createServer((request, response) => {
    console.log('Server running at port 8000')
    response.writeHead(200, {'content-type': 'text/html'})
    fs.readFile('./src/index.html', null, (error, data) => {
        if (error){
            response.writeHead(404)
            response.write('file not found')    
        } else {
            response.write(data)
        }
        response.end()
    })

}).listen(8000)