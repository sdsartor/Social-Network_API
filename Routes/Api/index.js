const router = require('express').Router();
const userRouter = require("./userRoute");
const thoughtsRouter = require('./thoughtsRoute');

router.use('/thoughts', thoughtsRouter);
router.use("/users", userRouter);

module.exports = router;