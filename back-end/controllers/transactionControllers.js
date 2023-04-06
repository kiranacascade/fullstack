const db = require("../models");
const jwt = require("jsonwebtoken");
const event = db.Event;
const { Op } = require("sequelize");

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const { ticket_qty, total_price } = req.body;

      let token = req.headers.authorization;
      if (!token) throw "Unauthorized/Token expired";
    } catch (err) {
      console.log(err);
    }
  },
};
