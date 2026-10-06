const db = require('../datasource/db')

const create = async (data) => {
  const [result] = await db.execute(
    'INSERT INTO reports (reason, status, user_id) VALUES (?, ?, ?)',
    [data.reason, data.status || 'open', data.user_id]
  )
  const reportId = result.insertId
  if (data.sighting_id) {
    await db.execute(
      'INSERT INTO sightings_reports (report_id, sighting_id) VALUES (?, ?)',
      [reportId, data.sighting_id]
    )
  } else if (data.confirmation_id) {
    await db.execute(
      'INSERT INTO confirmations_reports (report_id, confirmation_id) VALUES (?, ?)',
      [reportId, data.confirmation_id]
    )
  } else if (data.debunk_id) {
    await db.execute(
      'INSERT INTO debunks_reports (report_id, debunk_id) VALUES (?, ?)',
      [reportId, data.debunk_id]
    )
  }

  return reportId
}

module.exports= {create}