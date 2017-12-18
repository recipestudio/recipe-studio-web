var express = require('express');
var router = express.Router();

var fetch = require('node-fetch');
var APIurl = 'http://api.recipe.studio/'

/* GET home page. */
router.get('/', (req, res, next) => {
  let query = APIurl + 'recipe/all';
  console.log('fetching '+query);

  fetch(query)
      .then( (res) => { return res.json(); })
      .then( (data) => {
          res.render( 'index', { recipes: data.data } );
      });
});

// GET terms page
router.get('/terms', (req, res, next) => {
    console.log('hi');
    res.render( 'terms' );
})

// GET login page
router.get('/login', (req, res, next) => {
    res.render( 'login' );
})

module.exports = router;
