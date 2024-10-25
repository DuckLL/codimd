'use strict'

// core
const { sequelize, Sequelize } = require('../models')

async function searchNote (req, res) {
  const query = req.query.q
  const queryArray = query.split(' ')

  const notes = await sequelize.query(
    `
    SELECT
      "shortid",
      "title",
      "lastchangeAt",
      pgroonga_snippet_html("content", ARRAY[:queryArray]) AS highlighted_content
    FROM "Notes"
    WHERE
      "content" &@~ :query;
    `,
    {
      replacements: { query, queryArray },
      type: Sequelize.QueryTypes.SELECT,
      limit: 100
    }
  )

  res.json(notes)
}

// public
exports.searchNote = searchNote
