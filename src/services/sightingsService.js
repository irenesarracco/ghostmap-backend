const db= require('../datasource/db')

const getAll= async()=> {
    const [rows] = await db.execute('SELECT * FROM sightings')
    return rows
}

const getById= async(id)=>{
    const [rows]= await db.execute('SELECT * FROM sightings WHERE id= ?', [id])
    return rows[0]
}

const create= async(data)=> {
    const [result]= await db.execute(
        `INSERT INTO sightings 
            (title, description, lat, lon, location_name, event_at, category_id, user_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
         [data.title, data.description, data.lat, data.lon, data.location_name, data.event_at, data.category_id, data.user_id]
    )
    return result.insertId
}

const update= async(id, data)=> {
    const fields = []
    const values = []

        if (data.title !== undefined) { fields.push('title = ?'); values.push(data.title) }
        if (data.description !== undefined) { fields.push('description = ?'); values.push(data.description) }
        if (data.lat !== undefined) { fields.push('lat = ?'); values.push(data.lat) }
        if (data.lon !== undefined) { fields.push('lon = ?'); values.push(data.lon) }
        if (data.location_name !== undefined) { fields.push('location_name = ?'); values.push(data.location_name) }
        if (data.event_at !== undefined) { fields.push('event_at = ?'); values.push(data.event_at) }
        if (data.category_id !== undefined) { fields.push('category_id = ?'); values.push(data.category_id) }

        values.push(id)

    const [result] = await db.execute(
        `UPDATE sightings SET ${fields.join(', ')} WHERE id = ?`,
        values
  )
    return result.affectedRows
}


const deleteById= async(id)=> {
    const result= await db.execute(
        'DELETE FROM sightings WHERE id=?', [id]
    )
    return result.affectedRows
}


const getAllConfirmations= async(sightingId)=> {
    const [rows]= await db.execute('SELECT * FROM confirmations WHERE sighting_id = ?', [sightingId])
    return rows
    
}

const createConfirmation= async(data)=>{
    const [result]= await db.execute(
        `INSERT INTO confirmations
        (description, event_at, user_id, sighting_id) 
             VALUES (?, ?, ?, ?)`,
             [data.description, data.event_at, data.user_id, data.sighting_id]
    )
    return result.insertId
}


const getAllDebunks= async(sightingId)=> {
    const [rows]= await db.execute('SELECT * FROM debunks WHERE sighting_id = ?', [sightingId])
    return rows
    
}

const createDebunk= async(data)=>{
    const [result]= await db.execute(
        `INSERT INTO debunks
        (type, explanation, user_id, sighting_id) 
             VALUES (?, ?, ?, ?)`,
             [data.type, data.explanation, data.user_id, data.sighting_id]
    )
    return result.insertId
}


module.exports = {getAll, getById, create, update, deleteById, getAllConfirmations, createConfirmation, getAllDebunks, createDebunk}