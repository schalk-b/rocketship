const got = require('got')

let lastPrice = null

const accountSid = 'AC60621527ed28ba512ff560b8f3db4286'; 
const authToken = 'secret'; 
const client = require('twilio')(accountSid, authToken); 

const handler = setInterval(async () => {
  const { body } = await got('https://solanalysis-dot-feliz-finance.uc.r.appspot.com/projects/get_all_project_stats', { responseType: 'json' })

  const aurory = body.Projects.find(x => x.DisplayName === 'Aurory')

  if (aurory.FloorPrice < 23) {
    console.log('woohoo hit the floor price')
    await client.messages 
      .create({ 
         body: `Aurory FloorPrice: ${aurory.FloorPrice}`,  
         messagingServiceSid: 'MG792bbad3e60f7cbd22fbee3fc76d6da4',      
         to: 'secret'
       }) 
    clearInterval(handler)
  }

  if (lastPrice === null || lastPrice !== aurory.FloorPrice) {
    console.log(`FloorPrice: ${aurory.FloorPrice}`)
    lastPrice = aurory.FloorPrice
  }
}, 5000)
