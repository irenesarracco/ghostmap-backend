const sightingsService= require('../services/sightingsService')

const getAll= async(req, res)=> {
    try{
        const sightings= await sightingsService.getAll()
        res.json({sightings})
    } catch(error){
        res.status(500).json({error: {code:500, message: error.message}})
    }
}

const getById= async(req, res)=> {
    try{
        const id=req.params.id
        const sighting= await sightingsService.getById(id)
        if (!sighting){
            return res.status(404).json({error: {code: 404, message: 'Avvistamento non trovato'}})
        }
        res.json({data:sighting})
    } catch(error) {
        res.status(500).json({error:{code:500, message: error.message}})
    }
}

const create = async(req, res)=> {
    try{
        const insertId= await sightingsService.create(req.body)
        const sighting= await sightingsService.getById(insertId)
        res.status(201).json({sighting})
    }
    
 catch(error){
    res.status(500).json({error:{code:500, message: error.message}})
 }
}

const update= async(req, res)=> {
    try{
        const affectedRows= await sightingsService.update(req.params.id, req.body)
        if(affectedRows===0){
            res.status(404).json({ error: { code: 404, message: 'Avvistamento non trovato' } })
        }
        const sighting = await sightingsService.getById(req.params.id)
            res.json({ data: sighting })

    } catch(error){
        res.status(500).json({error:{code:500, message: error.message}})
    }
}

const deleteById = async(req,res)=>{
    try{
        const affectedRows= await sightingsService.deleteById(req.params.id)
        if(affectedRows===0){
            res.status(404).json({ error: { code: 404, message: 'Avvistamento non trovato' } })
        }
        res.status(201).json({message: 'Avvistamento eliminato'})

    } catch(error){
        res.status(500).json({error:{code:500, message: error.message}})
    }
}


const getAllConfirmations= async(req,res)=> {
    try{
        const confirmations= await sightingsService.getAllConfirmations(req.params.id)
        res.json({confirmations})
    }catch(error){
        res.status(500).json({error:{code:500, message: error.message}})

    }
}

const createConfirmation = async (req, res) => {
  try {
    const insertId = await sightingsService.createConfirmation({
      ...req.body,
      sighting_id: req.params.id
    })
    res.status(201).json({ data: { id: insertId } })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}

const getAllDebunks= async(req,res)=> {
    try{
        const debunks= await sightingsService.getAllDebunks(req.params.id)
        res.json({debunks})
    }catch(error){
        res.status(500).json({error:{code:500, message: error.message}})

    }
}

const createDebunk = async (req, res) => {
  try {
    const insertId = await sightingsService.createDebunk({
      ...req.body,
      sighting_id: req.params.id
    })
    res.status(201).json({ data: { id: insertId } })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: error.message } })
  }
}


module.exports= {getAll, getById, create, update,deleteById, getAllConfirmations, createConfirmation, getAllDebunks,createDebunk}