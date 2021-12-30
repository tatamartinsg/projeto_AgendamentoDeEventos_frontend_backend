const axios = require('axios')
const URL = 'https://osf-digital-backend-academy.herokuapp.com/api'
const mySecretKey = '$2a$08$ckS7xXr1A5DUGxpmjZ.80.VtwOFV42n7kJyp/RIMTkO.zFARudASi'

class Products{
    async getAllProducts(){
        const { data } = await axios(`${URL}/products/product_search?secretKey=${mySecretKey}`)
        return data
    }
    async getProductById(master_id){
        const { data } = await axios(`${URL}/products/product_search?id=${master_id}&secretKey=${mySecretKey}`)
        return data
    }
    async getProductsByCategory(primary_category_id){
        const { data } = await axios(`${URL}/products/product_search?primary_category_id=${primary_category_id}&secretKey=${mySecretKey}`)
        return data
    }
}

module.exports = new Products