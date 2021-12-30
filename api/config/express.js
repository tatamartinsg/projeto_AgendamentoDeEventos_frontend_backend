const bodyParser = require('body-parser')
const express = require('express')
const consign = require('consign')
const session = require('express-session')
const morgan = require('morgan')
const cors = require('cors')

module.exports = () =>{
    const app = express()
    app.use(morgan('dev'))
    app.use(session({secret: 'secret-key-session'}))

    app.use(cors())
    
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Header',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
        if(req.method === 'OPTIONs'){
            res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
            return res.status(200).send({})
        }
        next()
    })
    
    consign()
        .include('routes')
        .into(app)

    return app
}