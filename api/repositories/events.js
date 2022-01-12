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
    addPersonWhoIsConfirmed(body) {
        const sql = `INSERT INTO schedule_event_confirmed(nameEvent, namePerson, dateEvent, description ,emailConfirmed, eventID) VALUES ('${body.nameEvent}','${body.namePerson}','${body.dateEvent}','${body.description}','${body.emailConfirmed}','${body.eventID}');`
        return query(sql)
    }
    selectIdEvent() {
        const sql = `SELECT * FROM schedule_event WHERE id_schedule = LAST_INSERT_ID()`
        return query(sql)
    }
    showWhoIsConfirmedById(id_event) {
        const sql = `SELECT * FROM schedule_event_confirmed WHERE eventID = '${id_event}';`
        return query(sql)
    }
    showEventsUserConfirmed(user) {
        const sql = `SELECT * FROM schedule_event_confirmed WHERE emailConfirmed  = '${user}';`
        return query(sql)
    }
}

module.exports = new Events