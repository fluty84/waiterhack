const jwt = require("express-jwt")

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
})

function getTokenFromHeaders(req) {

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1]

        // console.log('EXTRAYENDO DESDE EL MIDDLEWARE EL TOKEN ----- ', token)

        return token
    }

    return null
}

module.exports = {
    isAuthenticated
}