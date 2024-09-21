const {Prompt} = require('../models/chatschema')
const cron = require('node-cron')

chatrem = async() => {
    try {
        const oneHourAgo = new Date()
        oneHourAgo.setHours(oneHourAgo.getHours() - 1)
        const result = await Prompt.deleteMany({
            createdAt: {
                $lt: oneHourAgo
            },
            isEmpty: true
        })
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} expired chat`);
        }
    } catch (error) {
        console.error('Error deleting Chat: ', error);
    }
}

cron.schedule('*/10 * * * * *', async () => {
    chatrem()
})

console.log('Expired Chat removal trigger scheduled')