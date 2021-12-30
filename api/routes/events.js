const verifyJWT = require('../middleware/login')
const EventsBD = require('../repositories/events.js')

module.exports = app => {
    app.get('/clientes', verifyJWT, async(req,res) => {
        console.log('entrou')
        res.status(200).json({id: req._idUser, message: 'ok'})
    })
    app.post('/addEvent', async(req,res) => {
        console.log("entrou post", req.body)
        EventsBD.addEvent(req.body)
            .then(response => {
                console.log(response)
                res.status(200).send("Entrou")
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
}