const verifyJWT = require('../middleware/login')
const EventsBD = require('../repositories/events.js')
const Cadastro = require('../repositories/cadastro.js')
const Email = require('../config/email.js')

module.exports = app => {
    app.get('/clientes', verifyJWT, async(req,res) => {
        console.log('entrou')
        res.status(200).json({id: req._idUser, message: 'ok'})
    })
    app.post('/addEvent', async(req,res) => {
        console.log("entrou post", req.body)
        EventsBD.addEvent(req.body)
            .then(response => {
                if(req.body.check == true){
                    console.log(req.body.check)
                    Cadastro.selecionaUsuarios()
                        .then(res => {
                            var EmailRemetente = ""
                            var NomeRemetente = ""
                            var AllEmails = []
                            
                            for(var j = 0; j< res.length; j++){
                                if(res[j].id == req.body.idUserLogged){
                                    var index = j
                                    EmailRemetente = `${res[index].email}`
                                    NomeRemetente = `${res[index].name}`
                                }
                                else{
                                    AllEmails.push(res[j].email)
                                }
                            }
                            Email.sendEmail(EmailRemetente, NomeRemetente, AllEmails, req.body)
                            // Email.sendEmail(res,req.body)
                            // console.log(EmailRemetente, NomeRemetente, AllEmails)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                res.status(200).json(req.body)
            })
            .catch((error) => {
                console.log(error)
            })
        
    })
    app.get('/allEvents/:id', async(req,res)=>{
        const getId = req.params.id
        console.log(getId)
        EventsBD.getEvents(getId)
            .then(response => {
                console.log(response)
                res.status(200).json(response)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    app.delete('/eventDelete/:id', async(req,res) => {
        const id_delete = req.params.id
        EventsBD.deleteEvent(id_delete)
            .then(response => {
                console.log(response)
                res.status(200).json(response)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    app.post('/sendEmail', async(req,res) => {
        const data = req.body
        console.log(data)
    })


}