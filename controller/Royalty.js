const UserData = require("../Modals/Users");
const plan = require("../Modals/plan");
const Ranks = require("../Modals/ranks");
const userWallet = require("../Modals/userWallet");
const saveTransection = require("./commans/SaveTransections");
const transection = require("../Modals/transction");
const Incomes = require("../API/User/incomeTransection");
class royalty {
  constructor() {
    // this.royalty_closing()
  }
  async royalty_rank_closing(){
    try {
      const allRankHolder = await Ranks.find();
      const {royalty_plan}=await plan.findOne({ "royalty_plan.status": 1 })
      const {ranks} = royalty_plan;
      for (let index = 0; index < allRankHolder.length; index++) {
        const {user_Id,royalty_rank} = allRankHolder[index];
        const {Activation_date} = await UserData.findOne({user_Id});
        const Updated_rank = royalty_rank;
        const matchingIndices = await ranks.reduce(async(indices, rank, index) => {
          const newDate = new Date(Activation_date);
              const endOfDay = new Date(
                newDate.getFullYear(),
                newDate.getMonth(),
                newDate.getDate() + rank.max_days
              );
              const active_direct = await UserData.find({
                sponsor_Id: user_Id,
                Activation_date: {
                  $lt: endOfDay,
                },
                status: 1,
              }).count();
              console.log(user_Id,active_direct)
          if (
            active_direct >= rank.direct_required
          ) {
            console.log(user_Id,":",user_Id)
            Updated_rank[index].status = 1;
        console.log("her1",Updated_rank)
            indices.push(index);
            const rankUpdate = await Ranks.findOneAndUpdate(
              { user_Id },
              { royalty_rank: Updated_rank }
            );
            return user_Id;
          }
        }, []);
      }
    } catch (error) {
      return{status:false,error}
    }
  }
  // async royaltyRank() {
  //   try {
  //     const allUsers = await UserData.find({ status: 1 }).sort({
  //       Activation_date: -1,
  //     });
  //     const { royalty_plan } = await plan.findOne({ "royalty_plan.status": 1 });
  //     const { ranks } = royalty_plan;
  //     for (let index = 0; index < allUsers.length; index++) {
  //       const { user_Id, Activation_date } = allUsers[index];
  //       const { royalty_rank } = await Ranks.findOne({ user_Id });
  //       if (royalty_rank) {
  //         const Updated_rank = royalty_rank;
    
  //         ranks.reduce((indices, rank, index) => {
           
  //             const newDate = new Date(Activation_date);
  //             const endOfDay = new Date(
  //               newDate.getFullYear(),
  //               newDate.getMonth(),
  //               newDate.getDate() + rank.max_days
  //             );
  //             UserData.find({
  //               sponsor_Id: user_Id,
  //               Activation_date: {
  //                 $lt: endOfDay,
  //               },
  //               status: 1,
  //             }).count().then(async(myDirect)=>{
  //               if (myDirect>=rank.direct_required) {
  //                   Updated_rank[index].status = 1;
  //                   const rankUpdate = await Ranks.findOneAndUpdate(
  //                       { user_Id },
  //                       { royalty_rank: Updated_rank }
  //                     );
  //                   console.log('myDirect',newDate,endOfDay,myDirect,rank.direct_required,Updated_rank)
                  
  //               }
  //             });
  //         }, []);
  //       }
  //     }
  //   } catch (error) {
  //     return error
  //   }
  // }
  async royaltyGoal(user_Id){
    const {royalty_plan}= await plan.findOne();
    const {royalty_rank} = await Ranks.findOne({user_Id});
    // const {active_single_leg} = await userWallet.findOne({user_Id});
    const newArray = [];
    const {ranks} = royalty_plan;
    for (let index = 0; index < ranks.length; index++) {
        const {max_days,direct_required,rank_name} = ranks[index];
        const {status} = royalty_rank[index];
        let obj = {
            rank_name,
            max_days,
            direct_required,
            status
        }
        newArray.push(obj)
        
    }
    return newArray;
}
async royalty_closing() {
    const { royalty_plan } = await plan.findOne({
      "royalty_plan.status": 1,
    });
    const allRankHolder = await Ranks.find();
    const { ranks } = royalty_plan;
    // console.log(allRankHolder)

    for (let index = 0; index < ranks.length; index++) {
      const { rank_name, value } = ranks[index];
      const filteredRankHolder = allRankHolder.filter((rankHolder) => {
        return rankHolder.royalty_rank[index].status === 1;
      });
      const inc =
        value;
      filteredRankHolder.map(async (item, ind) => {
        const today_income = await Incomes.getTodayIncome(
            item.user_Id,
            "royalty_income"
          );
          if (today_income==0) {
            const { royalty_income,main_wallet } = await userWallet.findOne({
                user_Id: item.user_Id,
              });
      
              const tx_body = {
                user_Id: item.user_Id,
                to_from: null,
                order_Id: null,
                stake_order_Id: null,
                tx_type: "Royalty Income",
                debit_credit: "credit",
                source: `royalty_income`,
                wallet_type: "main_wallet",
                amount: inc,
                status: 1,
                remark: `Recieved Royalty income ${inc} `,
                level: null,
                ben_per: null,
              };
              await saveTransection(tx_body);
              const updateWallet = await userWallet.findOneAndUpdate(
                { user_Id: item.user_Id },
                {
                  "royalty_income.value": royalty_income.value + inc,
                  "main_wallet.value": main_wallet.value + inc,
                }
              );
          }
      });
    }
  }
}
const Royalty = new royalty();
module.exports= Royalty;
