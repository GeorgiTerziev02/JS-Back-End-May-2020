const { Router } = require('express');
const { authAccess } = require('../utils/auth');
const getUserStatus = require('../utils/status');
const { createPlay, getPlayById, deletePlayById, editPlay, likePlay } = require('../controllers/plays');

const router = Router();

router.get('/create', authAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? req.query.error : null;
    res.render('create-theater', {
        title: 'Create Theater | Theaters',
        isLoggedIn: req.isLoggedIn,
        error
    });
});

router.post('/create', authAccess, getUserStatus, async (req, res) => {
    await createPlay(req, res);
});

router.get('/details/:id', authAccess, getUserStatus, async (req, res) => {
    const error = req.query.error ? req.query.error : null;
    const playId = req.params.id;
    try {
        const play = await getPlayById(playId);
        
        const isCreator = JSON.stringify(play.creator) === JSON.stringify(req.userId);
        const hasLiked = JSON.stringify(play.usersLiked).includes(JSON.stringify(req.userId));
    
        res.render('theater-details', {
            title: 'Play Details | Theater',
            isLoggedIn: req.isLoggedIn,
            play,
            isCreator,
            hasLiked,
            error
        });
    } catch (error) {
        console.error(error);
        return res.redirect(301, '/')
    }
});

router.get('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    const error = req.query.error ? req.query.error : null;
    const playId = req.params.id;
    const play = await getPlayById(playId);

    if (JSON.stringify(play.creator) !== JSON.stringify(req.userId)) {
        return res.redirect(301, `/play/details/${playId}`);
    }

    res.render('edit-theater', {
        title: 'Edit Play | Theaters',
        isLoggedIn: req.isLoggedIn,
        play,
        error
    })
})

router.post('/edit/:id', authAccess, getUserStatus, async (req, res) => {
    await editPlay(req, res);
});

router.get('/delete/:id', authAccess, getUserStatus, async (req, res) => {
    const playId = req.params.id;
    const status = await deletePlayById(playId, req.userId);
    
    if (!status) {
        return res.redirect(301, `/play/details/${playId}?error=Can't delete if you are not the creator`);
    }

    return res.redirect(301, '/');
});

router.get('/like/:id', authAccess, getUserStatus, async (req, res) => {
    const userId = req.userId;
    const playId = req.params.id;
    const status = await likePlay(playId, userId);

    if (!status) {
        return res.redirect(`/play/details/${playId}?error=You have already liked this play or you are the creator of the play`);
    }
    res.redirect(`/play/details/${playId}`);
})


module.exports = router;