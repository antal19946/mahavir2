const company_info = require("../../Modals/companyInfo");
const order = require("../../Modals/orders");
const userWallet = require("../../Modals/userWallet");
const Incomes = require("./incomeTransection");

class home {
    constructor() {
        // this.getWallet(1)
    }
    async getWallet(user_Id) {
       try {
         const wallet = await userWallet.findOne({ user_Id }).sort({
            wallet_name: -1,
          });
         const keys = Object.keys(wallet._doc);
         const newWallet=[]
         // console.log(keys);
         for (let index = 0; index < keys.length-3; index++) {
             const today_income = await Incomes.getTodayIncome(user_Id,keys[index]);
             const {name,wallet_type,wallet_status,value} = wallet[keys[index]]
             newWallet.push({name,wallet_type,wallet_status,value,today_income,key:keys[index]})
 
         }
 // console.log(newWallet,"errrrrrrrrrrrrrrrrrrr")
         return newWallet;
       } catch (error) {
        return error
       }
    }
    async getSelfInvestment(user_Id) {
        const orders = await order.find({
            user_Id,
            status: 1,
        });
        const total_order_amount = orders.reduce((acc, obj) => acc + obj.order_amount, 0);
        return total_order_amount;
    }
    async getCurrency() {
        const { currency, currency_sign } = await company_info.findOne();
        return { status: true, currency, currency_sign }
    }
}
const homeData = new home();
module.exports =  homeData ;