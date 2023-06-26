const cron = require('node-cron');
require('./DBconnection/Connection')
const singleLeg = require('./controller/SingleLegDistribution');
const Royalty = require('./controller/Royalty');

// Define the cron schedule
const schedule = '*/10 * * * * *'; // Runs every day at midnight

// Create the cron job
const job = cron.schedule(schedule,async () => {
  // This function will be executed once a day

  // Add your logic here
  const res = await singleLeg.single_leg_closing_static()
  const res2 = await Royalty.royalty_rank_closing()
  const res3 = await Royalty.royalty_closing()
  
  console.log(res,res2)
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata', // Replace with your desired timezone
});

// Start the cron job
job.start();
