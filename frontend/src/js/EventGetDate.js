const EventGetDate = () => {

    var data = new Date()

    var dia = data.getDate()
    var mes = data.getMonth()
    var ano = data.getFullYear()

    var generateDate = ano + '-' + mes +'-' + dia

    return generateDate
}

export { EventGetDate }