const postLogin = require('../controllers/login/postLogin')
module.exports = app => {

    app.get('/login', (req,res)=>{
        res.send('Entrou na rota login')
    })

    app.post('/login', (req,res) => {
        const body = {
            email: req.body.email,
            password: req.body.password
        }
        postLogin(req, res, body)
    })


}