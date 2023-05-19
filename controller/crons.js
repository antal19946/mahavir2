const Incomes = require("../API/User/incomeTransection");
const  User  = require("../API/User/user");
const UserData = require("../Modals/Users");
const order = require("../Modals/orders");
const plan = require("../Modals/plan");
const transection = require("../Modals/transction");
const userWallet = require("../Modals/userWallet");
const  saveTransection  = require("./commans/SaveTransections");
class cron {
  // constructor() {
  //   this.fun()

  // }
  // async fun(){
  //   const today_income = await Incomes.getTodayIncome(1, "roi_income");
  //   console.log("object",today_income)
  // }
  async roi_closing() {
    const orders = await order.find({status:1});
    const packageDetails = await plan.find();

    if (orders) {

      for (let index = 0; index < orders.length; index++) {
        const { order_Id, user_Id, package_name, order_amount } = orders[index]
        const today_income = await Incomes.getTodayIncome(user_Id, "roi_income");
    console.log("test", today_income)

        if (today_income == 0) {
          const { roi_income } = packageDetails.find(
            (rank) =>
              rank.package_name = package_name
          );
          if (roi_income.status == 1) {
            const inc = roi_income.income_type.value == "percentage" ? (order_amount * (roi_income.value/100)) : roi_income.value;
            const tx_body = {
              user_Id,
              to_from: null,
              order_Id,
              tx_type: "Roi Income",
              debit_credit: "credit",
              source: `roi_income`,
              wallet_type: 'main_wallet',
              amount: inc,
              status: 1,
              remark: `Recieved Roi income ${inc}`,
              level: null,
              ben_per: roi_income.value
            }
            const trans = await saveTransection(tx_body)
            // console.log(pack)
            const userwallet = await userWallet.findOne({ user_Id });
            const updateWallet = await userWallet.findOneAndUpdate({ user_Id }, { 'main_wallet.value': userwallet.main_wallet.value + inc, "roi_income.value": userwallet.roi_income.value + inc })
          }

        }

      }
    } else {
      console.log("not order")
    }
  }
}
const crons = new cron();
module.exports =  crons;
