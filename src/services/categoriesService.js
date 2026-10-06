const db= require('../datasource/db')

const getAll= async()=> {
    const[rows]= await db.execute('SELECT * FROM categories')
    return rows
}

const getById= async(id)=> {
    const [rows]= await db.execute(' SELECT * FROM categories WHERE id= ?', [id])
    return rows[0]
}

module.exports= {getAll, getById}