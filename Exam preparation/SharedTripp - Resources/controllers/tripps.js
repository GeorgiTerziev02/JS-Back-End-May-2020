const Trip = require('../models/trip');
const User = require('../models/user');

const offerTrip = async (req, res) => {
    const {
        startAndEndPoint,
        dateAndTime,
        carImage,
        seats,
        description
    } = req.body;

    const [startPoint, endPoint] = startAndEndPoint.split(' - ');
    const [date, time] = dateAndTime.split(' - ');

    const userId = req.userId;

    try {
        const trip = new Trip({ startPoint, endPoint, date, time, seats, description, carImage, creator: userId });
        const created = await trip.save();

        await User.findByIdAndUpdate(userId, {
            $push: { tripHistory: created._id }
        });
        res.redirect(301, '/shared-trips')
    } catch (err) {
        console.error(err);
        return res.redirect(301, '/offer-trip');
    }
};

const getTripById = async (id) => {
    return await Trip.findById(id).populate('buddies').lean();
}

const addBuddy = async (tripId, userId) => {
    await User.findByIdAndUpdate(userId, {
        $push: { tripHistory: tripId }
    });

    await Trip.findByIdAndUpdate(tripId, {
        $push: { buddies: userId }
    });
}

module.exports = {
    offerTrip,
    getTripById,
    addBuddy
}