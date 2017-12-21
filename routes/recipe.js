var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  // something later
});

// GET recipe page
router.get("/:id", (req, res, next) => {
  // render page for recipe by :id
  let rid = req.params.id;
  res.render("recipe", { recipeid: rid });
});

module.exports = router;
