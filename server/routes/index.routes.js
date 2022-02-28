const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/", require('./restaurant.routes'))


module.exports = router;


