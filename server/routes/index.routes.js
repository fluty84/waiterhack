const router = require("express").Router();

router.use("/coasters", require('./coasters.routes'))
router.use("/auth", require('./auth.routes'))

module.exports = router