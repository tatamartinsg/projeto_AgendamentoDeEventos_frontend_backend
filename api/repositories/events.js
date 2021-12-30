const query = require('../infrastructure/queries')

class Events{
    addEvent(body){
        if(body.check == ''){
            body.check = 'false'
             
        }
        const sql = `INSERT INTO schedule_event(nameEvent, dateEvent, dateCreated, description, checkbox, emailID) VALUES('${body.name}','${body.dateEvent}','${body.dateCreated}','${body.description}','${body.check}',${body.idUserLogged});`
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
}

module.exports = new Events