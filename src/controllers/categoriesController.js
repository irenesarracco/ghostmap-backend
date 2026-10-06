const categoriesService= require('../services/categoriesService')

const getAll= async(req, res)=>{
    try{
        const categories= await categoriesService.getAll()
        res.json({categories})
    }catch(error){
        res.status(500).json({error:{code:500, message: error.message}})
    }
}

const getById= async(req, res)=> {
    try{
        const category= await categoriesService.getById(req.params.id)
        if(!category){
            res.status(404).json({error:{code:404, message: 'Categoria non trovate'}})
        }
        res.json({category})
    }catch(error){
        res.status(500).json({error:{code:500, message: error.message}})

    }
}


module.exports={getAll, getById}