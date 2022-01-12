const conexao = require('./conexao.js')

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject)=>{
        return conexao.query(query, parametros, (erros,resultados,campos)=>{
            if(erros){
                reject(erros)
            }else{
                // console.log('Resultado query:')
                // console.log(resultados,parametros)
                resolve(resultados)
            }
        })
    })
    
}

module.exports = executaQuery