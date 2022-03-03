const router = require("express").Router();

router.use("/auth", require('./auth.routes'))
router.use("/", require('./restaurant.routes'))
router.use("/upload", require('./upload.routes'))


module.exports = router;


