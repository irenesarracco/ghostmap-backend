const mysql = require('mysql2/promise')
const { faker } = require('@faker-js/faker')

async function seed() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234!',
    database: 'mydb'
  })

  console.log('Connesso al database!')

  // Categories
  const categories = ['Fantasma', 'UFO', 'Poltergeist', 'Criptide', 'Luce anomala', 'Altro']
  for (const name of categories) {
    await db.execute(
      'INSERT IGNORE INTO categories (name, icon_url) VALUES (?, ?)',
      [name, `/icons/${name.toLowerCase()}.png`]
    )
  }
  console.log('Categories inserite!')

  // Users — 500
  const userIds = []
  for (let i = 0; i < 500; i++) {
    const [result] = await db.execute(
      'INSERT INTO Users (username, email, password, role, reputation) VALUES (?, ?, ?, ?, ?)',
      [
        faker.internet.username(),
        faker.internet.email(),
        '$2b$10$hashedpassword',
        'user',
        faker.number.int({ min: 0, max: 100 })
      ]
    )
    userIds.push(result.insertId)
  }
  console.log('Users inseriti!')

  // Sightings — 1000
  const sightingIds = []
  const statuses = ['new', 'confirmed', 'contested', 'debunked', 'hidden']
  for (let i = 0; i < 1000; i++) {
    const [result] = await db.execute(
      `INSERT INTO sightings 
        (title, description, lat, lon, location_name, event_at, category_id, user_id, status, credibility_score) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        faker.lorem.sentence({ min: 3, max: 8 }),
        faker.lorem.paragraph(),
        faker.location.latitude({ min: 36, max: 47 }),   // Italia
        faker.location.longitude({ min: 6, max: 18 }),    // Italia
        faker.location.city(),
        faker.date.past({ years: 2 }),
        faker.number.int({ min: 1, max: 6 }),
        faker.helpers.arrayElement(userIds),
        faker.helpers.arrayElement(statuses),
        faker.number.int({ min: 0, max: 100 })
      ]
    )
    sightingIds.push(result.insertId)
  }
  console.log('Sightings inseriti!')

  // Confirmations — circa 2000
  const confirmationIds = []
  for (let i = 0; i < 2000; i++) {
    const [result] = await db.execute(
      'INSERT INTO confirmations (description, event_at, user_id, sighting_id) VALUES (?, ?, ?, ?)',
      [
        faker.lorem.paragraph(),
        faker.date.past({ years: 2 }),
        faker.helpers.arrayElement(userIds),
        faker.helpers.arrayElement(sightingIds)
      ]
    )
    confirmationIds.push(result.insertId)
  }
  console.log('Confirmations inserite!')

  // Debunks — circa 500
  const debunkIds = []
  const debunkTypes = ['natural', 'animal', 'reflection', 'fake', 'perception', 'other']
  const debunkStatuses = ['pending', 'accepted', 'rejected']
  for (let i = 0; i < 500; i++) {
    const [result] = await db.execute(
      'INSERT INTO debunks (type, explanation, status, sighting_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [
        faker.helpers.arrayElement(debunkTypes),
        faker.lorem.paragraphs(2),
        faker.helpers.arrayElement(debunkStatuses),
        faker.helpers.arrayElement(sightingIds),
        faker.helpers.arrayElement(userIds)
      ]
    )
    debunkIds.push(result.insertId)
  }
  console.log('Debunks inseriti!')

  // Debunk votes — circa 2000
  for (let i = 0; i < 2000; i++) {
    try {
      await db.execute(
        'INSERT IGNORE INTO debunk_votes (is_credible, debunk_id, user_id) VALUES (?, ?, ?)',
        [
          faker.datatype.boolean(),
          faker.helpers.arrayElement(debunkIds),
          faker.helpers.arrayElement(userIds)
        ]
      )
    } catch (e) {}
  }
  console.log('Debunk votes inseriti!')

  // Media — circa 1500
  const mediaIds = []
  const mediaTypes = ['photo', 'video', 'audio']
  for (let i = 0; i < 1500; i++) {
    const [result] = await db.execute(
      'INSERT INTO media (type, file_url, file_size, mime_type, user_id) VALUES (?, ?, ?, ?, ?)',
      [
        faker.helpers.arrayElement(mediaTypes),
        `/uploads/${faker.string.uuid()}.jpg`,
        faker.number.int({ min: 100000, max: 10000000 }),
        'image/jpeg',
        faker.helpers.arrayElement(userIds)
      ]
    )
    mediaIds.push(result.insertId)
  }
  console.log('Media inseriti!')

  // Media associativi
  for (const mediaId of mediaIds) {
    const rand = Math.random()
    try {
      if (rand < 0.5) {
        await db.execute(
          'INSERT IGNORE INTO sightings_medias (media_id, sighting_id) VALUES (?, ?)',
          [mediaId, faker.helpers.arrayElement(sightingIds)]
        )
      } else if (rand < 0.75) {
        await db.execute(
          'INSERT IGNORE INTO confirmations_medias (media_id, confirmation_id) VALUES (?, ?)',
          [mediaId, faker.helpers.arrayElement(confirmationIds)]
        )
      } else {
        await db.execute(
          'INSERT IGNORE INTO debunks_medias (media_id, debunk_id) VALUES (?, ?)',
          [mediaId, faker.helpers.arrayElement(debunkIds)]
        )
      }
    } catch (e) {}
  }
  console.log('Media associativi inseriti!')

  // Reports — circa 300
  const reportIds = []
  const reportReasons = ['spam', 'offensive', 'privacy', 'fake', 'other']
  const reportStatuses = ['open', 'accepted', 'rejected']
  for (let i = 0; i < 300; i++) {
    const [result] = await db.execute(
      'INSERT INTO reports (reason, status, user_id) VALUES (?, ?, ?)',
      [
        faker.helpers.arrayElement(reportReasons),
        faker.helpers.arrayElement(reportStatuses),
        faker.helpers.arrayElement(userIds)
      ]
    )
    reportIds.push(result.insertId)
  }
  console.log('Reports inseriti!')

  // Reports associativi
  for (const reportId of reportIds) {
    const rand = Math.random()
    try {
      if (rand < 0.5) {
        await db.execute(
          'INSERT IGNORE INTO sightings_reports (report_id, sighting_id) VALUES (?, ?)',
          [reportId, faker.helpers.arrayElement(sightingIds)]
        )
      } else if (rand < 0.75) {
        await db.execute(
          'INSERT IGNORE INTO confirmations_reports (report_id, confirmation_id) VALUES (?, ?)',
          [reportId, faker.helpers.arrayElement(confirmationIds)]
        )
      } else {
        await db.execute(
          'INSERT IGNORE INTO debunks_reports (report_id, debunk_id) VALUES (?, ?)',
          [reportId, faker.helpers.arrayElement(debunkIds)]
        )
      }
    } catch (e) {}
  }
  console.log('Reports associativi inseriti!')

  await db.end()
  console.log('Seed completato!')
}

seed().catch(console.error)