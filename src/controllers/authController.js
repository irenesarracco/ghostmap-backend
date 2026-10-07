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

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body
    const result = await authService.refresh(refreshToken)
    res.json({ data: result })
  } catch (error) {
    res.status(401).json({ error: { code: 401, message: error.message } })
  }
}

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body
    await authService.logout(refreshToken)
    res.json({ message: 'Logout effettuato' })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

module.exports = { register, login, me, refresh, logout }