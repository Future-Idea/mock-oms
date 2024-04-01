const express = require("express");
const router = express.Router();


router.get('/', (req, res)=>{
    res.send ("Welcome to Returns")
})

router.get('/listReturns',(req, res) =>{
    res.send("List of Returns")
})

router.get(`/processReturn/:id`, (req, res)=>{
    res.send(`Test Return ${req.params.id} Processed`)
})
module.exports = router;


