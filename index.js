const got = require('got')

let lastPrice = null

const accountSid = 'AC60621527ed28ba512ff560b8f3db4286'; 
const authToken = 'secret'; 
const client = require('twilio')(accountSid, authToken); 

const sendSms = async (message) => {
  await client.messages 
    .create({ 
      body: message,  
      messagingServiceSid: 'MG792bbad3e60f7cbd22fbee3fc76d6da4',      
      to: 'secret'
    })

  await client.messages 
    .create({ 
      body: message,  
      messagingServiceSid: 'MG792bbad3e60f7cbd22fbee3fc76d6da4',      
      to: 'secret'
    })
}

const getAurory = async () => {
  const { body } = await got('https://solanalysis-dot-feliz-finance.uc.r.appspot.com/projects/get_all_project_stats', { responseType: 'json' })

  return body.Projects.find(x => x.DisplayName === 'Aurory')
}

const healthCheckHandler = setInterval(async () => {
  const aurory = await getAurory()

  await sendSms(`I'm alive! Aurory FloorPrice: ${aurory.FloorPrice}`)
}, 1000 * 60 * 60 * 24) // Daily

const handler = setInterval(async () => {
  const aurory = body.Projects.find(x => x.DisplayName === 'Aurory')

  if (aurory.FloorPrice < 23) {
    console.log('woohoo hit the floor price')
    await sendSms(`Aurory FloorPrice Hit: ${aurory.FloorPrice}`)
    clearInterval(handler)
    clearInterval(healthCheckHandler)
  }

  if (lastPrice === null || lastPrice !== aurory.FloorPrice) {
    console.log(`FloorPrice: ${aurory.FloorPrice}`)
    lastPrice = aurory.FloorPrice
  }
}, 5000) // 5 Seconds
