const fs = require('fs')
var json = require('./casamentos.json')


json.forEach(element =>{
    element._id = element.ref.replace(/\//g,'_')
})

const jsonString = JSON.stringify(json)
fs.writeFile('./casamentos-fix.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})