const ValidName = (nameValue) => {
    let sobrenome = nameValue.substring(nameValue.indexOf(" ") + 1, nameValue.length); //conteudo depois do espaço'
    let nome = nameValue.substring(0, nameValue.indexOf(" ")); //conteudo antes do espaço
    let nomeSobrenome = nome + sobrenome
    let tamanhoNomeCompleto = nomeSobrenome.length
    const numeros = /[0-9]/;

    for (var i = 0; i < tamanhoNomeCompleto; i++){
        if ((numeros.test(nomeSobrenome[i]))) {
            return 0
        }
    }
    if ((tamanhoNomeCompleto< 8) || (sobrenome.length < 5)) {
        return 0
    }
    else {
        return 1
    }

}

export { ValidName }