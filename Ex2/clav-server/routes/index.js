var express = require('express');
var axios = require('axios').default;
var router = express.Router();

let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4Mzg4NSwiZXhwIjoxNjExMDEyNjg1fQ.oL4U56TdCSCnqXwKAXWU04LbeNzr_L7ga9W2k3r8JqHWA5SGbIpS5YFMT0MPYHHkyN3TpVlJLc4m6tXTmO8qXBskqbo_U8O1-Nk7_nng4zjiOmfKZJK01mcn56aUuI25EGalP2gCPKYaK61V_dsGDnxFtxph7TmnHLGOttqUQqE-xSHR5EYi-mBOLdij9Pa7bQgWGclsejADRJ1_pNwGN_ufYIty1pygijjvxzroETwSMzmG0Z4X4ojgvlISlWFzfM343nuqVVDkwgpbEjfjtOtagKCkW3sPCpLMRNPIW7QIZiQ8d2Qk6iOjc6Sx5jhYTBoFHIbf75EVtaxWUsppmQ"

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token='+token).then(dados => {
    res.render('listItems', {lista: dados.data});
  })
  .catch(err =>{
    res.render('error', {error: err})
  })
});

router.get('/:id', function (req, res, next) {
  console.log("[GETTING] http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id +'/')
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id + '?token=' + token).then(dados => {
    res.render('singleItem', { dados: dados.data });
  })
    .catch(err => {
      console.log("erro")
      res.render('error', { error: err })
    })
});





module.exports = router;
