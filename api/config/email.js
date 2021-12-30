const nodemailer = require('nodemailer')

class Email{
    sendEmail(EmailRemetente, NomeRemetente, AllEmails, infoEvent){
        console.log(EmailRemetente,NomeRemetente,AllEmails)
        const sendEmailFixo = 'teste4api@hotmail.com'
        const message = `
            *EMAIL AUTOMATICO, POR FAVOR NÃO RESPONDA*
            
            Estamos notificando que um novo evento foi agendado, segue as informações:
            -> Nome do evento: ${infoEvent.name}
            -> Data do evento: ${infoEvent.dateEvent}
            -> Descrição do evento: ${infoEvent.description}
        `

        
        const remetente = nodemailer.createTransport({
            host:'smtp.ethereal.email',
            service: 'hotmail',
            port: 587,
            secure: false,
            auth: {
                user: sendEmailFixo,
                pass: 'api4teste'
            }
        })

        for( var i = 0; i < AllEmails.length; i++){
            const emailASerEnviado = {
                from: sendEmailFixo,
                to:AllEmails[i],
                subject: 'Enviando Email com Node.Js',
                text: message
            }
            remetente.sendMail(emailASerEnviado, function(error){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado com sucesso.');
                    }
            });
        }
        
    }
}
module.exports = new Email