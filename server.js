var express = require('express')
var app = express()

// At the top of your web.js
process.env.PWD = process.cwd()

// Then
app.set('port', (process.env.PORT || 3000))
app.use(express.static(process.env.PWD + '/core'));

app.get('*', function(request, response){
	response.sendFile(__dirname + '/index.html')
})

app.listen(app.get('port'), function(){
  console.log(`Express My App is loading on port: ${app.get('port')}`)
})