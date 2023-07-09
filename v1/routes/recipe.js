var express = require("express");
var router = express.Router();

// GET recipe index
router.get("/", (req, res) => {
  res.status(404);
});

// GET new recipe page
router.get("/new", (req, res) => {
  res.render("recipe/new");
});

// GET edit recipe page with :id
router.get("/edit/:id", (req, res) => {
  let rid = req.params.id;
  res.render("recipe/edit", { recipeid: rid });
});

// GET recipe page with :id
router.get("/:id", (req, res) => {
  // render page for recipe by :id
  let rid = req.params.id;
  res.render("recipe/index", { recipeid: rid });
});

module.exports = router;
