//email precisa ser do estilo email@hotmail.com 
//dominios validos = gmail, hotmail e braip

module.exports = function ValidEmail(emailValue){
    let dominio = emailValue.substring(emailValue.indexOf("@") + 1, emailValue.length); //after '@'
    let user = emailValue.substring(0, emailValue.indexOf("@")); //before @

    let afterDot = dominio.substring(dominio.indexOf(".") + 1, dominio.length) // after '.'
    let beforeDot = dominio.substring(0, dominio.indexOf(".")) //before '.'

    // verificar se o dominio é hotmail, gmail ou braip - se nao for um desse, o email é invalido
    const emails = ['hotmail', 'gmail', 'braip']
    const result = emails.find(resultado => resultado == beforeDot)
    
    if ((emailValue.length < 10) || (emailValue.length == 0) || (user.length < 4) || (dominio.length < 7) || (afterDot.length < 2) || (!result)){
        return 0;
    }
    else{
        console.log('email válido!')
        return 1;
    }
    
}
