var express = require('express');
var router = express.Router();

var fetch = require('node-fetch');

var APIurl = 'http://api.recipe.studio/';

/* GET home page. */
router.get('/', (req, res, next) => {
    // something later
});

// POST new recipe
router.post('/new', (req, res, next) => {
    // create new recipe using api.recipe.studio

});

// GET recipe page
router.get('/:id', (req, res, next) => {

    // load recipe from api.recipe.studio and render page with data
    let rid = req.params.id;
    let query = APIurl + 'recipe/' + rid;
    console.log('fetching '+query);

    fetch(query)
        .then( (res) => { return res.json(); })
        .then( (data) => { 
            console.log(data);
            res.render( 'recipe', {recipe: data} ); 
        });
});

module.exports = router;