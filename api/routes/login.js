const postLogin = require('../controllers/login/postLogin')
const ValidEmail = require('../validations/validEmail/validEmail')
const SelectDB = require('../repositories/select')
const Email = require('../config/email')

module.exports = app => {

    app.get('/login', (req, res) => {
        res.send('Entrou na rota login')
    })

    app.post('/login', (req, res) => {
        const body = {
            email: req.body.email,
            password: req.body.password
        }
        postLogin(req, res, body)
    })

    app.post('/change-password', async (req, res) => {
        console.log(req.body)
        if (ValidEmail(req.body.email) == 0) {
            return res.status(400).json({ message: "Email invalid" })
        }
        await SelectDB.verifyEmailDataBase(req.body)
            .then(result => {
                if (result.length == 0) {
                    return res.status(400).json({ message: "email does not exist" })
                }
                let url = `http://localhost:8080/changepass/${result[0].idUserEncrypt}`
                let message = `
                    <h1>Change your password</h1>
                    <p>Click on this link bellow to change your password: <a href=${url}>CHANGE PASS</a></p>
                `
                console.log(message, result)
                try {
                     // Email.sendEmail(message, req.body.email)
                    res.status(200).json({message:"ok"})
                }
                catch(e) {
                    console.log(e)
                }
               

            })
            .catch(err => { console.log(err) })
    })
    
    app.post('/change-password/:id', (req, res) => {
        console.log(req.params)
        console.log(req.body)
        if (req.body.newpassword1 === req.body.newpassword2) {
            console.log('iguais')
            //encryptar a senha
            //ir no banco de dados e trocar (update) a senha
        }
    })

}