const db = require("../models");
const jwt = require("jsonwebtoken");
const event = db.Event;
const { Op } = require("sequelize");

module.exports = {
  addEvent: async (req, res) => {
    try {
      const { name, date, venue, total_ticket, price } = req.body;

      let token = req.headers.authorization;

      if (!token)
        throw {
          status: false,
          message: "Unauthorized / Token expired",
        };

      token = token.split(" ")[1];

      const verifiedUser = jwt.verify(token, "JWT");
      console.log(verifiedUser);

      if (!verifiedUser.isAdmin) throw "Access denied: You are not admin";

      if (!name || !date || !venue || !total_ticket || !price) throw "Please complete your forms";

      const data = await event.create({
        ...req.body,
        admin_id: verifiedUser.isAdmin,
        remaining_ticket: total_ticket,
      });

      res.status(200).send({
        status: true,
        data: data,
        message: "Event successfully created",
      });
    } catch (err) {
      console.log(err);
    }
  },
  showEvents: async (req, res) => {
    try {
      const data = await event.findAll({
        where: {
          date: {
            [Op.gte]: new Date(),
          },
          remaining_ticket: {
            [Op.gt]: 0,
          },
        },
        attributes: ["name", "date", "venue", "total_ticket", "remaining_ticket", "price"],
      });
      res.status(200).send({
        status: true,
        data: data,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
};
