var express = require('express');
var router = express.Router();

var fetch = require('node-fetch');
var APIurl = 'http://api.recipe.studio/'

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = APIurl + 'recipe/all';
  console.log('fetching '+query);

  fetch(query)
      .then( (res) => { return res.json(); })
      .then( (data) => {
          res.render( 'index', { recipes: data.data, title: 'Recipe Studio' } );
      });
});

module.exports = router;
