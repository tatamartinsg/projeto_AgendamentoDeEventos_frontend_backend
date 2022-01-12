module.exports = function generateToken(info) {

    const jwt = require('jsonwebtoken')
    const tokenKEY = (process.env.JWT_KEY)
    // console.log(tokenKEY)
    const token = jwt.sign({
        name: info.name,
        email: info.email,
        _idUser: info.id
        },tokenKEY,{
        expiresIn: "2000000"
    })
    return token
}