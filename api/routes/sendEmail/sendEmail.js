const Email = require('../../config/email.js')
module.exports = app => {
    app.get('/sendEmail/:token/:email', (req, res) => {
        const url = `http://localhost:8080/confirmation/${req.params.token}`
        const emailSent = [`${req.params.email}`]
        const messageEmail = `Please confirm your email account on that link bellow: <a href="${url}">${url}</a>`
        console.log(url)
        //pra melhorar a segurança, verificar se o email existe no banco de dados!
        // Email.sendEmail(messageEmail, emailSent)
        res.status(200).json({message:"email was sent again!"})   
    })
}