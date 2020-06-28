const { Router } = require('express');
const getUserStatus = require('../utils/status');
const { getAllCourses, getTopThree } = require('../controllers/courses');

const router = Router();

router.get('/', getUserStatus, async (req, res) => {
    const courses = req.isLoggedIn ? await getAllCourses() : await getTopThree();

    res.render('home', {
        title: 'Home | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username || '',
        courses
    });
});

module.exports = router;