import axios from 'axios'

class Api{
    getAllCadastros(){
        const data  = axios.get('http://localhost:3000/all-cadastros')
        return data
    }
    async postCadastro(searchParams) {
        const data = await axios.post('http://localhost:3000/cadastro', searchParams)
        return data
    }
}
// const { api } = axios('https://localhost:3000')

export default new Api