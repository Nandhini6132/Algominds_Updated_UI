import mongoose from 'mongoose';

const premiumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Nandhini'
    },
    email: {
        type: String,
        required: true,
        default: 'nandhini@gmail.com'
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    isSubscribedMonthly: {
        type: Boolean,
        default: false
    },
    isSubscribedYearly:{
        type: Boolean,
        default: false
    }
})

const Premium = mongoose.models.Premium || mongoose.model('Premium', premiumSchema);

export default Premium;