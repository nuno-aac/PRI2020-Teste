var express = require('express');
const mongoose = require('mongoose');
const casamentos = require('../controllers/casamentos-controller')

var router = express.Router();

var mongoDB = 'mongodb://127.0.0.1/Teste2021';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

router.get('/api/casamentos', function(req, res) {
  casamentos.findall({}, { _id: 1, date: 1, title: 1 }).then(dados => {
    let result = dados
    if (req.queryobject.nome){
      result = []
      dados.forEach(element =>{
        if (element.title.includes(req.queryobject.nome))
          result.push(element)
      })
    } else if(req.queryobject.byAno == 'true'){
      result = {}
      dados.forEach((element) => {
        if (!result[element.date]){
          result[element.date] = []
          result[element.date].push(element)
        } else {
          result[element.date].push(element)
        }
      })
    } else if(req.query.ano){
      result = []
      dados.forEach(element => {
        if (element.date.includes(req.queryobject.ano))
          result.push(element)
      })
    }

    res.status(201).jsonp(result)
  })
  .catch(err => {
    res.status(500).jsonp({ err: "[500] Erro ao aceder casamentos: " + err })
  })
});

router.get('/api/casamentos/noivos', function (req, res) {
  console.log('HERE')
  casamentos.findall({}, { _id: 1, date: 1, title: 1 }).then(dados => {
    let result = []
    dados.forEach(element => {
      let noivo = element.title.match(/: .* c\.c\./)[0]
      noivo = noivo.substring(2,noivo.length-5)
      result.push(noivo)
    })
    res.status(201).jsonp(result)
  })
    .catch(err => {
      res.status(500).jsonp({ err: "[500] Erro ao aceder casamentos: " + err })
    })
});

router.get('/api/casamentos/:id', function (req, res) {
  casamentos.findone(req.params.id).then(dados => {
    res.status(201).jsonp(dados)
  })
  .catch(err => {
    res.status(500).jsonp({ err: "[500] Erro ao aceder casamento: " + err })
  })
});



module.exports = router;
