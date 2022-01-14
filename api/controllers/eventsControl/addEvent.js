const EventsBD = require('../../repositories/events')
const sendEmail4event = require('./sendEmail4event')
const EncryptID = require('../encryptID/EncryptID')

module.exports = async function AddEvent(req, res) {
    try{
        const addEventDataBase = EventsBD.addEvent(req.body)
        if (addEventDataBase) {
            if (req.body.checkbox == true) {
                const selectIDEvent = await EventsBD.selectIdEvent()
                const lastID = selectIDEvent[0].id_schedule
                const encryptaID =  EncryptID(lastID)
                EventsBD.addIdEncrypt(lastID, encryptaID)
                sendEmail4event(req,res,encryptaID)
            }
        }
    }
    catch (e) {
        console.log(e)
    }
   
}