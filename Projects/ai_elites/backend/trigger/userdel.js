const {user} = require('../models/user')
const cron = require('node-cron')

userrem = async() => {
    try {
        const thresholdDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const result = await user.deleteMany({ verified: false, createdAt: { $lt: thresholdDate } })
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} unverified accounts`);
        }
    } catch (error) {
        console.error("Error deleting Account: ", error);
    }
}

cron.schedule('*/10 * * * * *', async () => { 
    userrem()
})

console.log('Expired User removal trigger scheduled')