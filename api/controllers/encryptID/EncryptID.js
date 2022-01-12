const bcrypt = require('bcrypt')

module.exports = function EncryptID(id) {
    console.log('idddd')
    console.log(id)
    const id_hash = id + 'id'
    var salt = bcrypt.genSaltSync(5)
    return bcrypt.hashSync(id_hash, salt)
}
