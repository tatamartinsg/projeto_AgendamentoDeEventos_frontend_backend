const query = require('./queries')

class CreateTable{
    init(conexao){
        console.log('Tabelas foram chamadas!')
        this.conexao = conexao
        this.createTableDB()
        this.createTableDBSchedule()
        this.createTableDBScheduleEventsConfirmed()
    }
    createTableDB(){
        const sql = 'CREATE TABLE IF NOT EXISTS signUP_users (id int NOT NULL AUTO_INCREMENT, name varchar(255), email varchar(255) NOT NULL, password varchar(255) NOT NULL, confirmed varchar(5), idUserEncrypt varchar(255) , PRIMARY KEY(id));'
        return query(sql)
    }
    createTableDBSchedule(){
        const sql = 'CREATE TABLE IF NOT EXISTS schedule_event (id_schedule int NOT NULL AUTO_INCREMENT, nameEvent varchar(255), dateEvent varchar(255), dateCreated varchar(255), description varchar(255), checkbox varchar(30), idEncrypt varchar(255) ,emailID int NOT NULL , PRIMARY KEY(id_schedule),  FOREIGN KEY (emailID) REFERENCES signUP_users(id));'
        return query(sql)
    }
    createTableDBScheduleEventsConfirmed(){
        const sql = 'CREATE TABLE IF NOT EXISTS schedule_event_confirmed (id_schedule_event int NOT NULL AUTO_INCREMENT, nameEvent varchar(255),  namePerson varchar(255), dateEvent varchar(255), description varchar(255) , eventIDEncrypt varchar(255),emailConfirmed varchar(255) , eventID int not null , PRIMARY KEY(id_schedule_event));'
        return query(sql)
    }
}

module.exports = new CreateTable