const router = require('express').Router();
const userRouter = require("./userroute");
// const thoughtsRouter = require('./thoughtsRoute');

// router.use('/thoughts', thoughtsRouter);
router.use("/users", userRouter);

module.exports = router;