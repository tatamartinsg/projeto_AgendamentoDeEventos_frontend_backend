 //senha precisa ter pelo menos 5 caracteres, 1 letra maiuscula, 1 letra minuscula e 1 numero

module.exports = function ValidPassword(passwordValue){
    const tamanhoSenha = passwordValue.length
    if (tamanhoSenha < 5) {
        return 0;
    }
    else {
        const letrasMaiusculas = /[A-Z]/;
        const letrasMinusculas = /[a-z]/;
        const numeros = /[0-9]/;
        
        let minuscula = 0
        let maiuscula = 0
        let num = 0

        var passSplit = passwordValue.split('')
       
        for (var i = 0; i < tamanhoSenha; i++){
            if (letrasMaiusculas.test(passSplit[i])) {
                maiuscula++
            }
            else if (letrasMinusculas.test(passSplit[i])) {
                minuscula++
            }
            else if (numeros.test(passSplit[i])) {
                num++
            }
        }

        if ((maiuscula > 0) && (minuscula > 0) && (num > 0)) {
            return 1;
        }
        else {
            return 0;
        }
        
    }
}