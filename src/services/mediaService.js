const db= require('../datasource/db')
const fs= require('fs')

const create= async(data) => {
    const [result]= await db.execute(
        'INSERT INTO media (type, file_url, file_size, mime_type, user_id) VALUES (?, ?, ?, ?, ?)',
        [data.type, data.file_url, data.file_size, data.mime_type, data.user_id]
  )
    const mediaId= result.insertId


    if (data.sighting_id) {
        await db.execute(
            'INSERT INTO sightings_medias (media_id, sighting_id) VALUES (?, ?)',
            [mediaId, data.sighting_id]
        )
    } else if (data.confirmation_id) {
        await db.execute(
            'INSERT INTO confirmations_medias (media_id, confirmation_id) VALUES(?,?)',
            [mediaId, data.confirmation_id]
        )
    } else if (data.debunk_id) {
        await db.execute(
            'INSERT INTO debunks_medias (media_id, debunk_id) VALUES(?,?)',
            [mediaId, data.debunk_id]
        )
    }

    return mediaId
}



const deleteById = async(id)=> {
    const [rows]= await db.execute('SELECT * FROM media WHERE id=?', [id])
    const media= rows[0]

    if(!media) return 0

    if(fs.existsSync(media.file_url)) {
        fs.unlinkSync(media.file_url)
    }

    const [result] = await db.execute('DELETE FROM media WHERE id=?', [id])
    return result.affectedRows
}


module.exports = {create, deleteById}