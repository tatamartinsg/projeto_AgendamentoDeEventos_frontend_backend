const jwt = require('jsonwebtoken')

const tokenKEY = toString(process.env.JWT_KEY)


const sign = payload => {
    jwt.sign(payload,tokenKEY, { expiresIn: 86400}) //token valid for 24 hours
}

const verify = token => {
    jwt.verify(token,tokenKEY)
}

module.exports = { sign, verify}