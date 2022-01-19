const EventsBD = require('../../repositories/events')
const sendEmail4event = require('./sendEmail4event')
const EncryptID = require('../encryptID/EncryptID')

module.exports = async function AddEvent(req, res) {
    try{
        const addEventDataBase = EventsBD.addEvent(req.body)
        if (addEventDataBase) {
            const selectIDEvent = await EventsBD.selectIdEvent()
            const lastID = selectIDEvent[0].id_schedule
            const encryptaID =  EncryptID(lastID)
            EventsBD.addIdEncrypt(lastID, encryptaID)
            if (req.body.checkbox == true) {
                return sendEmail4event(req,res,encryptaID)
            }
            return res.status(200).json({message: "We didn't notificate your event to others", status: true})
        }
    }
    catch (e) {
        console.log(e)
    }
   
}