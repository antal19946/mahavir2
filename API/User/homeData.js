const order = require("../../Modals/orders");
const userWallet = require("../../Modals/userWallet");

class home{
    async getWallet(user_Id){
        const wallet = await userWallet.findOne({user_Id});

        return wallet;
    }
    async getSelfInvestment(user_Id){
        const orders = await order.find({
            user_Id,
            status: 1,
          });
          const total_order_amount = orders.reduce((acc, obj) => acc + obj.order_amount, 0);
          return total_order_amount;
    }
}
const homeData =new home();
module.exports={homeData};