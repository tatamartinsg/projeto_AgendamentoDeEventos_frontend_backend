const Email = require('../../config/email.js')
const Select = require('../../repositories/select')

module.exports = app => {
    app.get('/sendEmail/:token/:email', (req, res) => {
        if (req.params.token && req.params.email) {
            Select.selectEmail(req.params) //pra melhorar a segurança, verificar se o email existe no banco de dados!
                .then(results => {
                    console.log(results.length)
                    if (results.length == 0) {
                        return res.status(400).json({message: "error, email does not exist"})
                    }
                    const url = `http://localhost:8080/confirmation/${req.params.token}`
                    const emailSent = [`${req.params.email}`]
                    const messageEmail = `Please confirm your email account on that link bellow: <a href="${url}">${url}</a>`
                    console.log(url)
                    // setTimeout(() => {
                    //     Email.sendEmail(messageEmail, emailSent)
                    //     return res.status(200).json({message:"email is sending again!"})   
                    // },2000)
                    
                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json({message: "error"})
                })
        }
      
        
    })
}