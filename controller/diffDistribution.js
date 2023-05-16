const { User } = require("../API/User/user");
const UserData = require("../Modals/Users");
const order = require("../Modals/orders");
const transection = require("../Modals/transction");
const { Transection } = require("./commans/saveTransections");

class Difference {
  // constructor() {
  //   this.fun();
  // }
  // async fun() {
  //   const orders = await order.find({
  //     user_Id: 1,
  //     status: 1,
  //   });

  //   // calculate the sum of the order_amount property using reduce()
  //   const total_order_amount = orders.reduce((acc, obj) => acc + obj.order_amount, 0);

  //   console.log('Total order amount:', total_order_amount);

  // }
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
        const orders = await order.find({
          user_Id: spo.user_Id,
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
          // console.log('Total order amount:', total_order_amount);
          const rank = ranks[rankIndex];
          // console.log(rankIndex, rank);
          if (rank) {
            const difference = rank.value - last_rank;
            if (difference !== 0) {
              let inc = amount * (rank.value / 100);
              const tarns = await Transection(
                spo.user_Id,
                u_Id,
                order_Id,
                "level_income",
                "credit",
                `level_income`,
                "main_wallet",
                inc,
                0,
                `Recieved level income from level ${index}(${u_Id})`,
              );
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
