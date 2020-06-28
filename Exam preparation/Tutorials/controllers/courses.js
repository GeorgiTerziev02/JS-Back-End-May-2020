const Course = require('../models/course');
const User = require('../models/user');

const createCourse = async (req, res) => {
    const {
        title,
        description,
        imageUrl,
        isPublic
    } = req.body;

    let public;
    if (isPublic) {
        public = true;
    } else {
        public = false;
    }

    const createdAt = new Date().toGMTString();
    const creator = req.userId;

    try {
        const course = new Course({ title, description, imageUrl, isPublic: public, createdAt, creator });
        const createdCourse = await course.save();
        res.redirect(301, `/course/details/${createdCourse._id}`)
    } catch (error) {
        console.error(error);
        res.redirect(301, '/course/create');
    }
};

const getAllCourses = async () => {
    const courses = await Course.find().sort({ usersEnrolled: '-1' }).lean();
    return courses;
};

const getTopThree = async () => {
    const courses = await Course.find().sort({ usersEnrolled: '-1' }).limit(3).lean();
    return courses;
}

const getCourseById = async (id) => {
    const course = await Course.findById(id).lean();
    return course;
};

const deleteCourseById = async (id) => {
    try {
        await Course.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const enrollToCourse = async (courseId, userId) => {
    const course = await getCourseById(courseId);
    if (JSON.stringify(course.usersEnrolled).includes(JSON.stringify(userId))) {
        return false;
    }

    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { usersEnrolled: userId } });
        const user = await User.findByIdAndUpdate(userId, { $push: { enrolledCourse: course._id } });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const editCubeById = async (req, res) => {
    const courseId = req.params.id;
    const userId = req.userId;
    const course = await getCourseById(courseId);

    if (JSON.stringify(course.creator) !== JSON.stringify(userId)) {
        return res.redirect(301, `/course/details/${courseId}`);
    }

    const {
        title,
        description,
        imageUrl,
        isPublic
    } = req.body;

    const newData = {
        isPublic: false
    };

    title && (newData.title = title)
    description && (newData.description = description)
    imageUrl && (newData.imageUrl = imageUrl)
    isPublic && (newData.isPublic = true);

    console.log(newData);
    try {
        await Course.findByIdAndUpdate(courseId, newData);

        res.redirect(301, `/course/details/${courseId}`);
    } catch (error) {
        console.error(error);
        res.redirect(301, `/course/edit/${courseId}`);
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    deleteCourseById,
    getCourseById,
    enrollToCourse,
    editCubeById,
    getTopThree
}