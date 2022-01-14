const bcrypt = require('bcrypt')

module.exports = function EncryptID(id) {
    console.log('idddd')
    console.log(id)
    const id_hash = id + 'id'
    var salt = bcrypt.genSaltSync(5)
    let idEncriptado = bcrypt.hashSync(id_hash, salt)
    console.log(idEncriptado)

    // string.prototype.replaceAll || (function() {
    //     var regMetaChars = /[-\\^$*+?.()|[\]{}]/g;
    //     String.prototype.replaceAll = function(needle, replacement) {
    //         return this.replace(new RegExp(needle.replace(regMetaChars, '\\$&'), 'g'), replacement);
    //     };
    // }());
    return idEncriptado.replace(/[/]/g,'0')
    // return 
}
