const Cadastro = require('../../repositories/cadastro.js')
const Email = require('../../config/email.js')

module.exports = async function sendEmail4event(req, res,encryptaID) {
    const result = await Cadastro.selecionaUsuarios()
    if (result.length == 0) {
        return res.status(400).json()
    }
    var AllEmails = []
    
    for (var j = 0; j < result.length; j++) {
        if (result[j].confirmed == 'true') {
            if (result[j].id == req.body.emailID) {
                var index = j
                var EmailRemetente = `${result[index].email}`
                var NomeRemetente = `${result[index].name}`
            }
            else {
                AllEmails.push(result[j].email)
            }
        }
    }
    console.log('URLLLLLLLLLLLLLLLLLLLLL')
    const url = `http://localhost:8080/confirmevent/${encryptaID}`
    const message = `
        <div style="text-align: center; border: solid 1px black; background-color: rgb(255, 255, 255); width: 80%; margin: 0 auto;">
            <p>Estamos notificando que um novo evento foi agendado, segue as informações:</p>
            <div style="width: 50%; text-align: left; margin: 0 auto;">
            <ul >
                <li style="padding: 8px;">Nome do evento: ${req.body.nameEvent}</li>
                <li style="padding: 8px;">Data do evento: ${req.body.dateEvent}</li>
                <li style="padding: 8px;">Descrição do evento: ${req.body.description}</li>
                <li style="padding: 8px;">Please confirm your participation on this link bellow: <a href="${url}">Clique aqui</a></li>
            </ul>
            </div>
            <p style="font-size: 14px;">*EMAIL AUTOMÁTICO, POR FAVOR, NÃO RESPONDA*</p>
        </div>
        
        
        
        
        
    `
    console.log(AllEmails[0])
    Email.sendEmail(message, AllEmails) 
    return res.status(200).json({status: true, message: "We notificate your events to others"})
}