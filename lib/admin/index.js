"use strict";

const models = require("../models");

async function index(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      status: "forbidden",
    });
  }

  // 查詢該使用者是否為 admin
  const adminUser = await models.User.findOne({
    where: {
      id: req.user.id,
      admin: true,
    },
  });

  if (!adminUser) {
    return res.status(403).send({
      status: "forbidden",
    });
  }

  // 查詢所有使用者的 createdAt, email, admin 資料
  const users = await models.User.findAll({
    attributes: ["id", "email", "createdAt", "updatedAt", "admin"], // 只選取這三個欄位
  });

  // 傳遞給前端 ejs 的資料
  const data = {
    users, // 傳遞所有使用者資料
  };

  return res.render("admin.ejs", data); // 將資料渲染到 admin.ejs
}

async function setAdmin(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      status: "forbidden",
    });
  }

  // 查詢該使用者是否為 admin
  const adminUser = await models.User.findOne({
    where: {
      id: req.user.id,
      admin: true,
    },
  });

  if (!adminUser) {
    return res.status(403).send({
      status: "forbidden",
    });
  }

  const user = await models.User.findByPk(req.body.userId);
  if (!user) {
    return res.status(404).send({
      error: "user not found",
    });
  }

  user.admin = req.body.admin;
  await user.save();

  res.send({
    status: "ok",
  });
}

async function resetPassword(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      status: "forbidden",
    });
  }

  // 查詢該使用者是否為 admin
  const adminUser = await models.User.findOne({
    where: {
      id: req.user.id,
      admin: true,
    },
  });

  if (!adminUser) {
    return res.status(403).send({
      status: "forbidden",
    });
  }

  const user = await models.User.findByPk(req.body.userId);
  if (!user) {
    return res.status(404).send({
      status: "user not found",
    });
  }

  const newPassword = Math.random().toString(36).slice(-8);
  user.password = newPassword;
  await user.save();

  res.send({
    newPassword: newPassword,
  });
}

exports.index = index;
exports.setAdmin = setAdmin;
exports.resetPassword = resetPassword;
