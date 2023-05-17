const company_info = require("../../Modals/companyInfo");
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
    async getCurrency(){
        const {currency,currency_sign} = await company_info.findOne();
        return {status:true,currency,currency_sign}
    }
}
const homeData =new home();
module.exports={homeData};