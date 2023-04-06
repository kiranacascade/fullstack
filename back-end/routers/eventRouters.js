const router = require("express").Router();
const { eventControllers } = require("../controllers");

router.post("/create", eventControllers.addEvent);
router.get("/upcoming", eventControllers.showEvents);

module.exports = router;
