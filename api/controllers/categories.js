const axios = require('axios')
const URL = 'https://osf-digital-backend-academy.herokuapp.com/api'
const mySecretKey = '$2a$08$ckS7xXr1A5DUGxpmjZ.80.VtwOFV42n7kJyp/RIMTkO.zFARudASi'

class Categories{
    async getCategoryById(id_category){
        const { data } = await axios(`${URL}/categories/${id_category}?secretKey=${mySecretKey}`)
        return data
    }

    async getCategoryByParentId(id_parent_category){
        const { data } = await axios(`${URL}/categories/parent/${id_parent_category}?secretKey=${mySecretKey}`)
        return data
    }
    
    async getAllCategories(){
        const { data } = await axios(`${URL}/categories/?secretKey=${mySecretKey}`)
        return data
    }
    
}

module.exports = new Categories