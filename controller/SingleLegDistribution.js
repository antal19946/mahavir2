const UserData = require("../Modals/Users");
const plan = require("../Modals/plan");
const userWallet = require("../Modals/userWallet");
const Ranks = require("../Modals/ranks");
const saveTransection = require("./commans/SaveTransections");
const transection = require("../Modals/transction");
const Incomes = require("../API/User/incomeTransection");

class Single_leg {
  constructor() {
    // this.singleLegRank()
  }
  async single_leg_rank(){
    try {
      const allUsers = await UserData.find({ status: 1 }).sort({
        Activation_date: -1,
      });
      const { single_leg_plan } = await plan.findOne({
        "single_leg_plan.status": 1,
      });
      const totalUser = allUsers.length - 1;
      for (let index = 0; index < allUsers.length; index++) {
        const element = array[index];
        
      }
    } catch (error) {
      
    }
  }
  async singleLegRank() {
  try {
      const allUsers = await UserData.find({ status: 1 }).sort({
        Activation_date: -1,
      });
      const { single_leg_plan } = await plan.findOne({
        "single_leg_plan.status": 1,
      });
      const totalUser = allUsers.length - 1;
      for (let index = 0; index < allUsers.length; index++) {
        const { user_Id } = allUsers[index];
        const mySingleLeg = totalUser - index;
        console.log("mySingleLeg", mySingleLeg);
        const getWallet = await userWallet.findOne({user_Id})
        if (getWallet) {
          const { active_direct } = await userWallet.findOneAndUpdate(
            { user_Id },
            { "active_single_leg.value": mySingleLeg }
          );
          const { ranks } = single_leg_plan;
          const { single_leg_rank } = await Ranks.findOne({ user_Id });
          if (single_leg_rank) {
            const Updated_rank = single_leg_rank;
      
            const matchingIndices = ranks.reduce((indices, rank, index) => {
              if (
                mySingleLeg >= rank.min_team &&
                mySingleLeg <= rank.max_team &&
                active_direct.value >= rank.direct_required
              ) {
                Updated_rank[index].status = 1;
                indices.push(index);
              }
              return indices;
            }, []);
            console.log("Matching Indices:", matchingIndices);
            console.log("Updated_rank", Updated_rank);
            const rankUpdate = await Ranks.findOneAndUpdate(
              { user_Id },
              { single_leg_rank: Updated_rank }
            );
          }
        }
      }
      return{status:true}
  } catch (error) {
    return error;
  }
  }
  async singleLegGoal(user_Id) {
    const { single_leg_plan } = await plan.findOne({
      "single_leg_plan.status": 1,
    });
    const { single_leg_rank } = await Ranks.findOne({ user_Id });
    const { active_single_leg } = await userWallet.findOne({ user_Id });
    const newArray = [];
    const { ranks } = single_leg_plan;
    for (let index = 0; index < ranks.length; index++) {
      const { min_team, direct_required, rank_name } = ranks[index];
      const { status } = single_leg_rank[index];
      let obj = {
        rank_name,
        active_single_leg: active_single_leg.value,
        single_leg_required: min_team,
        direct_required,
        status,
      };
      newArray.push(obj);
    }
    return newArray;
  }
  async single_leg_closing() {
    try {
      const { single_leg_plan } = await plan.findOne({
        "single_leg_plan.status": 1,
      });
      const allRankHolder = await Ranks.find();
      const { ranks } = single_leg_plan;
      // console.log(allRankHolder)
  
      for (let index = 0; index < ranks.length; index++) {
        const { rank_name, value } = ranks[index];
        const filteredRankHolder = allRankHolder.filter((rankHolder) => {
          return rankHolder.single_leg_rank[index].status === 1;
        });
        const inc =
          (single_leg_plan.fix_closing_amount * (value / 100)) /
          filteredRankHolder.length;
        filteredRankHolder.map(async (item, ind) => {
          const today_income = await Incomes.getTodayIncome(
              item.user_Id,
              "single_leg_income"
            );
            if (today_income==0) {
              const { single_leg_income,main_wallet } = await userWallet.findOne({
                  user_Id: item.user_Id,
                });
        
                const tx_body = {
                  user_Id: item.user_Id,
                  to_from: null,
                  order_Id: null,
                  stake_order_Id: null,
                  tx_type: "Single Leg Income",
                  debit_credit: "credit",
                  source: `single_leg_income`,
                  wallet_type: "main_wallet",
                  amount: inc,
                  status: 0,
                  remark: `Recieved Single Leg income ${inc} `,
                  level: null,
                  ben_per: null,
                };
                await saveTransection(tx_body);
                const updateWallet = await userWallet.findOneAndUpdate(
                  { user_Id: item.user_Id },
                  {
                    "single_leg_income.value": single_leg_income.value + inc,
                    "main_wallet.value": main_wallet.value + inc,
                  }
                );
            }
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}
const singleLeg = new Single_leg();
module.exports = singleLeg;
