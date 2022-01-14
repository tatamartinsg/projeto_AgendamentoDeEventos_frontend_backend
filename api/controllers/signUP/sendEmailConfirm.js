const Email = require('../../config/email')
module.exports = function sendEmailConfirm(token,resultados) {
    const url = `http://localhost:8080/confirmation/${token}`
    console.log(url)
    const message = `Please click this email to confirm your email: <a href="${url}">${url}</a>`
    const emailSent = [resultados[0].email]
    try {
        Email.sendEmail(message, emailSent)
    }
    catch (err) {
        console.log(err)
    }
}       