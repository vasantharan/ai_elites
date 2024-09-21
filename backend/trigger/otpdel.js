const {otp} = require('../models/otp')
const cron = require('node-cron')

otprem = async() => {
    try {
        const result = await otp.deleteMany({
            expireAt: {
                $lt: new Date()
            }
        });
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} expired OTPs`);
        }
    } catch (error) {
        console.error('Error deleting OTP: ', error);
    }
}

cron.schedule('*/10 * * * * *', async () => {
    otprem()
})

console.log('Expired OTP removal trigger scheduled')