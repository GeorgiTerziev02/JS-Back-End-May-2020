const { Router } = require('express');
const getUserStatus = require('../utils/status');
const { authAccess } = require('../utils/auth');
const { offerTrip, getTripById, addBuddy } = require('../controllers/tripps');
const Trip = require('../models/trip');
const auth = require('../utils/auth');

const router = Router();

router.get('/shared-trips', authAccess, getUserStatus, async (req, res) => {
    const trips = await Trip.find().lean();
    res.render('sharedTripps', {
        title: 'Shared Tripps',
        isLoggedIn: req.isLoggedIn,
        email: req.isLoggedIn ? req.email : '',
        trips
    });
});

router.get('/offer-trip', authAccess, getUserStatus, (req, res) => {
    res.render('offerTripp', {
        title: 'Offer Trip | Shared Tripps',
        isLoggedIn: req.isLoggedIn,
        email: req.isLoggedIn ? req.email : ''
    });
})

router.post('/offer-trip', authAccess, getUserStatus, async (req, res) => {
    await offerTrip(req, res);
})

router.get('/trip/details/:id', authAccess, getUserStatus, async (req, res) => {
    const tripId = req.params.id;
    const trip = await getTripById(tripId);
    const userId = JSON.stringify(req.userId);
    const isSameUser = userId === JSON.stringify(trip.creator);
    const hasJoined = JSON.stringify(trip.buddies).includes(userId);
    const freeSeats = trip.seats - trip.buddies.length;

    res.render('tripDetails', {
        title: 'Tripp | Shared Tripps',
        isLoggedIn: req.isLoggedIn,
        email: req.isLoggedIn ? req.email : '',
        trip,
        isSameUser,
        hasJoined,
        freeSeats,
        emptySeats: freeSeats > 0
    });
});

router.get('/close-trip/:id', authAccess, getUserStatus, (req, res) => {
    const tripId = req.params.id;
    console.log(tripId);
    Trip.findByIdAndDelete(tripId, (err) => {
        if (err) {
            console.error(err);
            return res.redirect(301, `/trip/details/${tripId}`);
        }

        return res.redirect(301, '/shared-trips');
    });
});

router.get('/join-trip/:id', authAccess, getUserStatus, async (req, res) => {
    const tripId = req.params.id;
    const userId = req.userId;

    await addBuddy(tripId, userId);

    res.redirect(301, `/trip/details/${tripId}`);
});

module.exports = router;