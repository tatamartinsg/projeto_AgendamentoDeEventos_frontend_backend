const query = require('../infrastructure/queries')

class Events{
    addEvent(body) {
        console.log(body)
        if(body.check == ''){
            body.check = 'false'
        }
        const sql = `INSERT INTO schedule_event SET ? `
        return query(sql,body)
    }
    addIdEncrypt(last_id,idEncrypt) {
        const sql = `UPDATE schedule_event SET idEncrypt = '${idEncrypt}' WHERE id_schedule = '${last_id}';`
        return query(sql)
    }
    getEvents(getId){
        const sql = `SELECT * FROM schedule_event WHERE emailID = '${getId}';`
        return query(sql,getId)
    }
    deleteEvent(id_delete){
        const sql = `DELETE FROM schedule_event WHERE id_schedule = '${id_delete}';`
        return query(sql,id_delete)
    }
    deleteEventConfirmed(id_delete){
        const sql = `DELETE FROM schedule_event_confirmed WHERE eventID = '${id_delete}';`
        return query(sql,id_delete)
    }
    deleteUserfromEvent(user_info) {
        const sql = `DELETE FROM schedule_event_confirmed WHERE eventID = '${user_info.id}' AND emailConfirmed = '${user_info.email}';`
        return query(sql)
    }
    getEventsById(getId){
        const sql = `SELECT * FROM schedule_event WHERE id_schedule = '${getId}';`
        return query(sql,getId)
    }
    getEventsByIdEncrypt(getId){
        const sql = `SELECT * FROM schedule_event WHERE idEncrypt = '${getId}';`
        return query(sql,getId) 
    }
    addPersonWhoIsConfirmed(body) {
        const sql = `INSERT INTO schedule_event_confirmed SET ?`
        return query(sql, body)
    }
    selectIdEvent() {
        const sql = `SELECT * FROM schedule_event WHERE id_schedule = LAST_INSERT_ID()`
        return query(sql)
    }
    showWhoIsConfirmedById(id_event) {
        const sql = `SELECT * FROM schedule_event_confirmed WHERE eventID = '${id_event}';`
        return query(sql)
    }
    showWhoIsConfirmedByIdEncrypt(id_event) {
        console.log(id_event)
        const sql = `SELECT * FROM schedule_event_confirmed WHERE eventIDEncrypt = '${id_event}';`
        return query(sql)
    }
    showEventsUserConfirmed(user) {
        const sql = `SELECT * FROM schedule_event_confirmed WHERE emailConfirmed  = '${user}';`
        return query(sql)
    }
    verifyIfPersonIsAlreadyConfirmed(body) {
        const sql = `SELECT * FROM schedule_event_confirmed WHERE emailConfirmed  = '${body.emailConfirmed}' AND eventIDEncrypt = '${body.eventIDEncrypt}';`
        return query(sql)
    }
}

module.exports = new Events