const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home | Shared Trip'
    });
});

module.exports = router;