const { Router } = require('express');

const router = Router();

router.get('/', async (req, res)=>{
    res.json('hiii');
});

module.exports = router;