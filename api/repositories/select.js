const query = require('../infrastructure/queries')

class Select{
    selectEmail(body){
        console.log('oi',body.email)
        const sql = `SELECT * FROM signUP_users WHERE email = '${body.email}';`
        return query(sql,body)
    }
    // seeIfItsConfirmed(email){
    //     console.log('email queri', email)
    //     const sql = `SELECT * FROM signUP_users WHERE (email = '${email}' AND confirmed = 'true');`
    //     return query(sql,email)
    // }
}

module.exports = new Select