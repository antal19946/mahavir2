const stakeOrders = require("../../Modals/StakeOrders");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");

class staking {
  constructor() {
  }
  async stake(userSesson, body) {
    const { amount, stake_for_days } = body;
    try {
      const { main_wallet } = await userWallet.findOne({ user_Id: userSesson });
    const {staking_income} = await plan.findOne({'staking_income.status':1});
      const { stakes } = staking_income;
          const stakeIndex = stakes.findIndex(
            (stake) =>
            stake_for_days == stake.days
          );
          if (stakeIndex>=0) {
            const stake_orders = await stakeOrders.find({
              user_Id: userSesson,
              status: 1,
            });
            const total_staking_amount = stake_orders.reduce(
              (acc, obj) => acc + obj.staking_amount,
              0
            );
            const restAmount = main_wallet.value - total_staking_amount;
            if (restAmount >= amount) {
              const stakeCount = await stakeOrders.find().count();
              const currentDate = new Date();
              const futureDate = new Date(currentDate);
              futureDate.setDate(futureDate.getDate() + parseInt(stake_for_days));
              try {
                const stake = new stakeOrders({
                  user_Id: userSesson,
                  stake_Id: stakeCount + 1,
                  tx_type: "staking",
                  stake_for_days,
                  staking_amount: amount,
                  stake_time_start: currentDate,
                  stake_time_end: futureDate,
                  status: 1,
                });
                const result = await stake.save();
                return { status: true, result };
              } catch (error) {
                return { status: false, error };
              }
            } else {
              return { status: false, message: "Insufficient fund" };
            }
          } else {
            return {status:false,message:'Invalid days'}
          }
      
    
   
    } catch (error) {
      return{status:false,message:'You can not Stake in this plan'}
    }
    
  }
}
const Staking = new staking();
module.exports = Staking;
