var express = require('express');
var router = express.Router();


/* GET user's list'.  ?? how to*/
router.get('/', function(req, res, next) {
  res.send(`show all users list?`);
});

/* GET user's home info'. */
router.get('/:home', function(req, res, next) {
  res.send(`user wants to get name ${req.params.home}`);
});

/* GET user's like info'. */
router.get('/:like', function(req, res, next) {
  res.send(`user wants to get name ${req.params.home}`);
});

/* GET user's coupon info'. */
router.get('/:coupon', function(req, res, next) {
  res.send(`user wants to get name ${req.params.home}`);
});

/* GET user's home info'. */
router.get('/:review', function(req, res, next) {
  res.send(`user wants to get name ${req.params.home}`);
});

/* GET user's review info'. */
router.get('/:home', function(req, res, next) {
  res.send(`user wants to get name ${req.params.home}`);
});

/* Post user's review to specific restaurant. */


module.exports = router;
