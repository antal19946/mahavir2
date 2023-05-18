const { User } = require("../API/User/user");
const UserData = require("../Modals/Users");
const order = require("../Modals/orders");
const transection = require("../Modals/transction");
const { saveTransection } = require("./commans/saveTransections");
const { isSameDay } = require('date-fns');

class Difference {
//   constructor() {
//     this.fun();
//   }
//   async fun() {
//     const currentDate = new Date();
//     const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
//     const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
//     const user = await UserData.find({
//       joining_date: {
//         $gte: startOfDay,
//         $lt: endOfDay,
//       }
//     });
// console.log(user)

//   }
  async level_distribution(u_Id, level, amount, packageDetail, order_Id) {
    const user = await User.getProfile(u_Id);
    var sponsor = user.sponsor_Id;
    var last_rank = 0;
    const walletAddress = [];
    const transctionAmt = [];
    const { difference_income } = packageDetail;
    for (let index = 0; index < level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      if (spo) {
        console.log("user_id",spo.user_Id)
        const orders = await order.find({
          user_Id: 1,
          status: 1,
        });
        const total_order_amount = orders.reduce((acc, obj) => acc + obj.order_amount, 0);
        if (difference_income.status == 1) {
          const { ranks } = difference_income;
          const rankIndex = ranks.findIndex(
            (rank) =>
              total_order_amount >= rank.min_investment &&
              total_order_amount <= rank.max_investment
          );
          console.log('Total order amount:', orders);
          const rank = ranks[rankIndex];
          console.log(rankIndex, rank);
          if (rank) {
            const difference = rank.value - last_rank;
            if (difference !== 0) {
              let inc = amount * (rank.value / 100);
              const tx_body = {
                user_Id: spo.user_Id,
                to_from: u_Id,
                order_Id,
                tx_type: "Level Income",
                debit_credit: "credit",
                source: `level_income`,
                wallet_type: 'main_wallet',
                amount: inc,
                 status: 0,
                remark: `Recieved level income from level ${index+1}(${u_Id})`,
                level:index+1,
                ben_per:rank.value
              }
              const tarns =await saveTransection(tx_body);;
              const profile = await User.getProfile(tarns.user_Id)
              transctionAmt.push(
                tarns.amount
              );
              walletAddress.push(
                profile.user_name
              );
              last_rank = rank.value;
            }
            console.log("Rank:", rank);
            if (rankIndex === ranks.length - 1) {
              break;
            }
          }
          sponsor = spo.sponsor_Id;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return ({walletAddress,transctionAmt});
  }
}
const diffrenc = new Difference();
module.exports = diffrenc;
