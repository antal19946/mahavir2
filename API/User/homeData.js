const order = require("../../Modals/orders");
const userWallet = require("../../Modals/userWallet");

class home{
    constructor(){
        this.fun()
    }
    async fun(){
        const wallets = await userWallet.findOne({user_Id:1});
        console.log(wallets);

        for (const walletName in wallets) {
            if (wallets.hasOwnProperty(walletName)) {
              const wallet_type = wallets[walletName];
              console.log(walletName);
              console.log("00000000000000000000000")
            }
          }
        
    }
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