const query = require('../infrastructure/queries')

class Select{
    verifyEmailDataBase(body){
        const sql = `SELECT * FROM signUP_users WHERE email = '${body.email}';`
        return query(sql,body)
    }
}

module.exports = new Select