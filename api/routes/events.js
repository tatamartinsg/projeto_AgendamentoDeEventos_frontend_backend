const verifyJWT = require('../middleware/login')
const EventsBD = require('../repositories/events.js')
const AddEvent = require('../controllers/eventsControl/addEvent.js')

module.exports = app => {
    app.get('/clientes', verifyJWT, async(req,res) => {
        console.log('entrou')
        res.status(200).json({id: req._idUser, message: 'ok'})
    })
    app.post('/addEvent', async(req,res) => {
        if(req.body.name.length == 0 || req.body.description.length == 0  || req.body.dateEvent.length == 0 ){
            return res.status(400).json({message: 'An input is empty', status: 'empty'})
        }
        AddEvent(req,res)

        
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