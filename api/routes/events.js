const verifyJWT = require('../middleware/login')
const EventsBD = require('../repositories/events.js')
const AddEvent = require('../controllers/eventsControl/addEvent.js')

module.exports = app => {
    app.get('/clientes', verifyJWT, async(req,res) => {
        console.log('entrou')
        res.status(200).json({id: req._idUser, message: 'ok'})
    })
    app.post('/addEvent', async(req,res) => {
        if(req.body.nameEvent.length == 0 || req.body.description.length == 0  || req.body.dateEvent.length == 0 ){
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
                EventsBD.deleteEventConfirmed(id_delete)
                    .then(response => {
                        console.log(response)
                        res.status(200).json(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    })

    app.post('/sendEmail', async(req,res) => {
        const data = req.body
        console.log(data)
    })

    app.get('/confirmevent/:id', (req, res) => {
        console.log('req', req.params.id)
        console.log('uai')
        EventsBD.getEventsById(req.params.id)
            .then(response => {
                console.log('response:',response)
                res.status(200).json(response)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    app.post('/postEventConfirmed', (req, res) => {
        console.log("entrou post")
        console.log(req.body)
        
        EventsBD.addPersonWhoIsConfirmed(req.body)
            .then(response => {
                console.log(response)
                res.status(200).json({confirmed: true})
            })
            .catch((error) => {
                console.log(error)
            })
    })

    app.get('/showParticipants/:id', (req, res) => {
        console.log("entrou get", req.params)
        EventsBD.showWhoIsConfirmedById(req.params.id)
            .then(response => {
                console.log(response)
                res.status(200).json({response})
            })
            .catch((error) => {
                console.log(error)
            })
    })

    app.get('/emailconfirmed/:email', (req, res) => {
        console.log("entrou email confirmed")
        console.log(req.params)
        EventsBD.showEventsUserConfirmed(req.params.email)
            .then(response => {
                console.log(response.length)
                res.status(200).json({response})
            })
            .catch((error) => {
                console.log("entrou error")
                console.log(error)
                res.status(400).json({message: 'empty', erro:error})
            })
    })

    app.delete('/delete-participation-event/:email/:id', (req, res) => {
        console.log("entrou delete event")
        console.log(req.params)
        const user_info = req.params
        EventsBD.deleteUserfromEvent(user_info)
            .then(response => {
                console.log(response)
                res.status(200).json({response})
            })
            .catch((error) => {
                console.log("entrou error")
                console.log(error)
                res.status(400).json({message: 'error', erro:error})
            })
    } )


}