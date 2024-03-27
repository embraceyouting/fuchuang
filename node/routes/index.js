const express = require("express");
const router = express.Router();

const baseRoute = require("./base.js");
const gptRoute = require("./gpt.js");
const coverRoute = require("./cover.js");
const userRoute = require("./user.js");
const subjectRoute = require("./subject.js");
const projectRoute = require("./project.js");

router.use("/", baseRoute);
router.use("/gpt", gptRoute);
router.use("/cover", coverRoute);
router.use("/user", userRoute);
router.use("/subject", subjectRoute);
router.use("/project", projectRoute);

module.exports = router;
