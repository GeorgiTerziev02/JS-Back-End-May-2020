const Play = require('../models/play');
const User = require('../models/user');

const createPlay = async (req, res) => {
    const {
        title,
        description,
        imageUrl,
        isPublic
    } = req.body;

    if (title.trim().length === 0) {
        return res.redirect(`/play/create?error=Title should not be empty`);
    }

    if (description.trim().length === 0 || description.trim().length > 50) {
        return res.redirect(`/play/create?error=Description should not be empty and be less than 50`);
    }

    if (imageUrl.trim().length === 0) {
        return res.redirect(`/play/create?error=Image url should not be empty`);
    }

    let public = false;
    if (isPublic) {
        public = true;
    }

    const createdAt = new Date().toGMTString();
    const creator = req.userId;

    try {
        const play = new Play({ title, description, imageUrl, isPublic: public, createdAt, creator });

        const createdPlay = await play.save();

        res.redirect(301, `/play/details/${createdPlay._id}`);
    } catch (error) {
        console.error(error);
        res.redirect(301, '/play/create?error=Error occurred!');
    }
};

const getPlayById = async (id) => {
    const play = await Play.findById(id).lean();
    return play;
}

const deletePlayById = async (playId, userId) => {
    try {
        const play = await Play.findById(playId);

        if (!play) {
            return false;
        }

        if (JSON.stringify(play.creator) !== JSON.stringify(userId)) {
            return false;
        }

        play.deleteOne((err) => {
            if (err) {
                console.error(err);
            }

            return true;
        });
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getTopThree = async () => {
    const plays = await Play.find({ isPublic: true }).sort({ usersLiked: '-1' }).limit(3).lean();
    return plays;
}

const getAllPublic = async (sort) => {
    if (sort === 'likes') {
        return await Play.find({ isPublic: true }).sort({ usersLiked: '-1' }).lean();
    } else if (sort === 'date') {
        return await Play.find({ isPublic: true }).sort({ createdAt: '-1' }).lean();
    } else {
        const plays = await Play.find({ isPublic: true }).sort({ createdAt: '-1' }).lean();
        return plays;
    }
}

const editPlay = async (req, res) => {
    const playId = req.params.id;
    const userId = req.userId;
    const play = await getPlayById(playId);

    if (JSON.stringify(play.creator) !== JSON.stringify(userId)) {
        return res.redirect(301, `/play/details/${playId}`);
    }

    const {
        title,
        description,
        imageUrl,
        isPublic
    } = req.body;

    if (title.trim().length === 0) {
        return res.redirect(`/play/edit/${playId}?error=Title should not be empty`);
    }

    if (description.trim().length === 0 || description.trim().length > 50) {
        return res.redirect(`/play/edit/${playId}?error=Description should not be empty and be less than 50`);
    }

    if (imageUrl.trim().length === 0) {
        return res.redirect(`/play/edit/${playId}?error=Image url should not be empty`);
    }

    const newData = {
        isPublic: false
    };

    title && (newData.title = title)
    description && (newData.description = description)
    imageUrl && (newData.imageUrl = imageUrl)
    isPublic && (newData.isPublic = true);

    try {
        await Play.findByIdAndUpdate(playId, newData);

        res.redirect(301, `/play/details/${playId}`);
    } catch (error) {
        console.error(error);
        res.redirect(301, `/play/edit/${playId}`);
    }
};

const likePlay = async (playId, userId) => {
    try {
        const play = await Play.findById(playId);

        if (!play) {
            return false;
        }

        if (JSON.stringify(play.usersLiked).includes(JSON.stringify(userId))) {
            return false;
        }

        if (JSON.stringify(play.creator) === JSON.stringify(userId)) {
            return false;
        }

        const updatedPlay = await Play.findByIdAndUpdate(playId, { $push: { usersLiked: userId } });
        const user = await User.findByIdAndUpdate(userId, { $push: { likedPlays: playId } });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    createPlay,
    getPlayById,
    deletePlayById,
    getTopThree,
    getAllPublic,
    editPlay,
    likePlay
}