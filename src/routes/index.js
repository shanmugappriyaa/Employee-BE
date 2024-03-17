
const express = require('express')
const userRoutes = require('./userRoute')
const empRoutes =require('./empRoute')


const router = express.Router();
router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Backend of Emp App</h1>`)
})

router.use('/user',userRoutes);
router.use('/emp',empRoutes)

module.exports =  router
