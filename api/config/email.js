const nodemailer = require('nodemailer')

class Email{
    async sendEmail(message, AllEmails) {
        const sendEmailFixo = 'teste4api@hotmail.com'
    
        const remetente = await nodemailer.createTransport({
            host:'smtp.ethereal.email', // smtp.live.com
            service: 'hotmail',
            port: 465, //25 ou 465
            secure: false,
            auth: {
                user: sendEmailFixo,
                pass: 'api4teste'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        for( var i = 0; i < AllEmails.length; i++){
            const emailASerEnviado = {
                from: `Teste API <${sendEmailFixo}>`,
                to:AllEmails[i],
                subject: 'Enviando Email com Node.Js',
                html: message
            }
            setTimeout( () => {
                remetente.sendMail(emailASerEnviado, function(error){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado com sucesso.');
                        }
                });
            }, 5000 )
           
        }
        
    }
}
module.exports = new Email