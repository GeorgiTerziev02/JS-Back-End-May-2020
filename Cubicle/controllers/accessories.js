const Accessory = require('../models/accessory');

const getOtherAccessories = async (accessoriesToExclude) => {
    const accessories = await Accessory.find().select('_id name').lean();
    const notAttachedAccessories = accessories.filter(x => !accessoriesToExclude.includes(x._id.toString()));

    return notAttachedAccessories;
}

module.exports = {
    getOtherAccessories
}