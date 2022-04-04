const {
  getEnable,
  getDisable,
  getStatus,
} = require("../Controllers/admin-attendance");

const router = require("express").Router();

router.get("/enable", getEnable);
router.get("/disable", getDisable);
router.get("/status", getStatus);

module.exports = router;
