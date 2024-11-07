"use strict";

const models = require("../models");
const { Op } = require("sequelize"); // 確保已引入 Op

async function notepage(req, res) {
  const page = parseInt(req.params.page) || 1; // 頁碼預設為 1
  const limit = 100;
  const offset = (page - 1) * limit;

  const { rows: notes, count: totalCount } = await models.Note.findAndCountAll({
    attributes: ["shortid", "alias", "title", "createdAt", "lastchangeAt"],
    include: [
      {
        model: models.User,
        attributes: ["email"],
        as: "owner",
      },
    ],
    where: {
      ownerId: { [Op.ne]: null },
      lastchangeAt: { [Op.ne]: null },
    },
    order: [["lastchangeAt", "DESC"]], // 按 lastchangeAt 降冪排序
    limit,
    offset,
  });

  const totalPages = Math.ceil(totalCount / limit);

  const data = {
    notes,
    currentPage: page,
    totalPages,
  };

  return res.render("notepage.ejs", data);
}

exports.notepage = notepage;
