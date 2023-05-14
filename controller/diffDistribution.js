const { User } = require("../API/User/user");
const UserData = require("../Modals/Users");
const order = require("../Modals/orders");
const plan = require("../Modals/plan");

class Difference {
  constructor() {
    this.fun();
  }
  async fun() {
    const order_amount = await order.find({
      user_Id: 1,
      status: 1,
    });
    
    // calculate the sum of the order_amount property using reduce()
    const total_order_amount = order_amount.reduce((acc, obj) => acc + obj.order_amount, 0);
    
    console.log('Total order amount:', total_order_amount);
    
  }
  async level_distribution(u_Id,level,amount,packageDetail) {
    const user = await User.getProfile(u_Id);
    var sponsor = user.sponsor_Id;
    var last_rank = 0;
    const { difference_income } = packageDetail;
    for (let index = 0; index < level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      if (spo) {
        const { order_amount, user_Id } = await order.findOne({
          user_Id: spo.user_Id,
          status: 1,
        });
        if (difference_income.status == 1) {
          const { ranks } = difference_income;
          const rankIndex = ranks.findIndex(
            (rank) =>
            order_amount >= rank.min_investment &&
            order_amount <= rank.max_investment
          );
          console.log(rankIndex,rank); 

          const rank = ranks[rankIndex];
          if (rank) {
            const difference = rank.value - last_rank;
            if (difference !== 0) {
              let inc = amount * (rank.value / 100);
              Transection({
                user_Id,
                to_from: u_Id,
                tx_type: "Level Income",
                debit_credit: "credit",
                source: `level_income`,
                wallet_type: "main_wallet",
                amount: inc,
                status: 1,
                remark: `Recieved level income from level ${index}(${u_Id})`,
              });
            }
            console.log("Rank:", rank);
            if (rankIndex===ranks.length - 1) {
              break;
            }
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }
}
const diffrenc = new Difference();
module.exports = diffrenc;
