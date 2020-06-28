const { Router } = require('express');
const { authAccess } = require('../utils/auth');
const getUserStatus = require('../utils/status');
const { createCourse, getCourseById, deleteCourseById, enrollToCourse, editCubeById } = require('../controllers/courses');
const courses = require('../controllers/courses');

const router = Router();

router.get('/create', authAccess, getUserStatus, (req, res) => {
    res.render('create-course', {
        title: 'Create Course | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username
    });
});

router.post('/create', authAccess, getUserStatus, async (req, res) => {
    await createCourse(req, res);
});

router.get('/details/:id', authAccess, getUserStatus, async (req, res) => {
    const courseId = req.params.id;

    const course = await getCourseById(courseId);
    const isCreator = JSON.stringify(course.creator) === JSON.stringify(req.userId);
    const isEnrolled = JSON.stringify(course.usersEnrolled).includes(JSON.stringify(req.userId));

    res.render('details', {
        title: 'Details Course | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username || '',
        isCreator,
        isEnrolled,
        course
    })
});

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const courseId = req.params.id;
    const status = await deleteCourseById(courseId);

    if (status) {
        res.redirect(301, '/');
    } else {
        res.redirect(301, `/course/details/${courseId}`);
    }
});

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const courseId = req.params.id;

    const course = await getCourseById(courseId);

    if (JSON.stringify(course.creator) !== JSON.stringify(req.userId)) {
        res.redirect(301, '/');
    }

    res.render('edit', {
        title: 'Edit Course | Tutorials',
        isLoggedIn: req.isLoggedIn,
        username: req.username,
        course
    })
});

router.post('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    await editCubeById(req, res);
});

router.get('/enroll/:id', authAccess, getUserStatus, async (req, res) => {
    const courseId = req.params.id;

    const status = await enrollToCourse(courseId, req.userId);

    if (status) {
        res.redirect(301, `/course/details/${courseId}`);
    } else {
        res.redirect(301, `/`);
    }
});

module.exports = router;