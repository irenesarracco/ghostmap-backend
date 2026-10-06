const authService= require('../services/authService')

const register= async(req, res)=> {
    try{
        const insertId= await authService.register(req.body)
        res.status(201).json({id:insertId})

    } catch(error){
        res.status(500).json({error:{code:500,  message: error.messge}})
    }
}

const login= async(req,res)=> {
    try{
        const result= await authService.login(req.body.email, req.body.password)
        res.json({result})
    } catch(error){
        res.status(401).json({error:{code:401, message: error.message}})
    }
}

const me= async(req,res)=> {
    try{
        const user= await authService.me(req.userId)
        res.json({user})
    } catch(error){
                res.status(500).json({error:{code:500,  message: error.messge}})

    }
}

module.exports = { register, login, me }