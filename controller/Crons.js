const Incomes = require("../API/User/incomeTransection");
const User = require("../API/User/user");
const stakeOrders = require("../Modals/StakeOrders");
const UserData = require("../Modals/Users");
const order = require("../Modals/orders");
const plan = require("../Modals/plan");
const transection = require("../Modals/transction");
const userWallet = require("../Modals/userWallet");
const roiLevel = require("./RoiLevelDistribution");
const saveTransection = require("./commans/SaveTransections");
class cron {
  constructor() {
    // this.staking_closing();
  }
  // async fun(){
  //   const today_income = await Incomes.getTodayIncome(1, "roi_income");
  //   console.log("object",today_income)
  // }
  async roi_closing() {
    const orders = await order.find({ status: 1 });
    const packageDetails = await plan.find();

    if (orders) {
      for (let index = 0; index < orders.length; index++) {
        const { user_Id, package_name, order_amount } = orders[index];
        const today_income = await Incomes.getTodayIncome(
          user_Id,
          "roi_income"
        );
        console.log("test", today_income);

        if (today_income == 0) {
          const { roi_income } = packageDetails.find(
            (rank) => (rank.package_name = package_name)
          );
          if (roi_income.status == 1) {
            const inc =
              roi_income.income_type.value == "percentage"
                ? order_amount * (roi_income.value / 100)
                : roi_income.value;
            const tx_body = {
              user_Id,
              to_from: null,
              order_Id: null,
              tx_type: "Roi Income",
              debit_credit: "credit",
              source: `roi_income`,
              wallet_type: "main_wallet",
              amount: inc,
              status: 1,
              remark: `Recieved Roi income ${inc}`,
              level: null,
              ben_per: roi_income.value,
            };
            const trans = await saveTransection(tx_body);
            // console.log(pack)
            const userwallet = await userWallet.findOne({ user_Id });
            const updateWallet = await userWallet.findOneAndUpdate(
              { user_Id },
              {
                "main_wallet.value": userwallet.main_wallet.value + inc,
                "roi_income.value": userwallet.roi_income.value + inc,
              }
            );
          }
        }
      }
    } else {
      console.log("not order");
    }
  }
  async staking_closing() {
    try {
      const allStake = await stakeOrders.find({ status: 1 });
    const { staking_income } = await plan.findOne({
      "staking_income.status": 1,
    });
    for (let index = 0; index < allStake.length; index++) {
      const {
        user_Id,
        stake_for_days,
        staking_amount,
        stake_time_start,
        stake_time_end,
        stake_Id,
      } = allStake[index];
      const { stakes } = staking_income;
      const stakeIndex = stakes.findIndex(
        (stake) => stake_for_days == stake.days
      );
      const amt_per_minutes =
        staking_amount * (stakes[stakeIndex].value / 1440 / 100);
      const last_transection = await transection
        .find({ stake_order_Id: stake_Id })
        .sort({ time: -1 })
        .limit(1);
      const firstTimestampStart =
        last_transection.length > 0
          ? new Date(last_transection[0].time)
          : new Date(stake_time_start);
      const firstTimestampEnd = new Date(stake_time_end);
      const secondTimestamp = new Date();
      const remainingStakTime = Math.floor(
        (secondTimestamp - firstTimestampEnd) / (1000 * 60)
      );
      const timeDiffInMillis = secondTimestamp - firstTimestampStart;
      const tx_gap = Math.floor(timeDiffInMillis / (1000 * 60));
      if (tx_gap > 0) {
        const { main_wallet, roi_income } = await userWallet.findOne({
          user_Id,
        });
        if (remainingStakTime < 0) {
          const inc = tx_gap * amt_per_minutes;
          const ben_per = (stakes[stakeIndex].value / 1440) * tx_gap;
          const minutes = tx_gap;
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          const days = Math.floor(hours / 24);
          const remainingHours = hours % 24;
          const tx_body = {
            user_Id,
            to_from: null,
            order_Id: null,
            stake_order_Id: stake_Id,
            tx_type: "Roi Income",
            debit_credit: "credit",
            source: `staking_income`,
            wallet_type: "main_wallet",
            amount: inc,
            status: 1,
            remark: `Recieved Staking income ${inc} for ${days} days, ${remainingHours} hours, and ${remainingMinutes} minutes.`,
            level: null,
            ben_per,
            level_distribution_status: 1,
          };
          const trans = await saveTransection(tx_body);
          console.log(
            inc,
            remainingStakTime,
            tx_gap,
            amt_per_minutes,
            last_transection.length,
            secondTimestamp,
            ben_per
          );
          const updateWallet = await userWallet.findOneAndUpdate(
            { user_Id },
            {
              "main_wallet.value": main_wallet.value + inc,
              "roi_income.value": roi_income.value + inc,
            }
          );
        } else {
          const inc = (tx_gap - remainingStakTime) * amt_per_minutes;
          if (inc > 0) {
            const ben_per =
              (stakes[stakeIndex].value / 1440) * (tx_gap - remainingStakTime);
            const minutes = tx_gap;
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;
            const tx_body = {
              user_Id,
              to_from: null,
              order_Id: null,
              stake_order_Id: stake_Id,
              tx_type: "Roi Income",
              debit_credit: "credit",
              source: `staking_income`,
              wallet_type: "main_wallet",
              amount: inc,
              status: 1,
              remark: `Recieved Staking income ${inc} for ${days} days, ${remainingHours} hours, and ${remainingMinutes} minutes.`,
              level: null,
              ben_per,
            };
            const trans = await saveTransection(tx_body);
            console.log(
              inc,
              remainingStakTime,
              tx_gap,
              amt_per_minutes,
              last_transection.length,
              secondTimestamp,
              ben_per
            );
            const updateWallet = await userWallet.findOneAndUpdate(
              { user_Id },
              {
                "main_wallet.value": main_wallet.value + inc,
                "roi_income.value": roi_income.value + inc,
              }
            );
            const updateStatus = await stakeOrders.findOneAndUpdate(
              { stake_Id },
              { status: 0 }
            );
          }
        }
      }
    }
    } catch (error) {
      console.log(error)
    }
    
  }
  async roi_level_income_closing() {
    const packageDetails = await plan.findOne({
      "roi_income.status": 1,
    });
    const allTransection = await transection.find({
      level_distribution_status: 1,
    });
    var obj = [];
    for (let index = 0; index < allTransection.length; index++) {
      const { user_Id, tx_Id, amount } = allTransection[index];
      roiLevel.roiLevelIncome(user_Id, 20, amount, packageDetails);
      obj.push(tx_Id);
    }
    const result = await transection.updateMany(
      { tx_Id: { $in: obj } },
      { $set: { level_distribution_status: 0 } }
    );
    return result;
  }
}
const crons = new cron();
module.exports = crons;
