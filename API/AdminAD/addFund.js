const UserData = require("../../Modals/Users");
const userWallet = require("../../Modals/userWallet");
const saveTransection = require("../../controller/commans/SaveTransections");
class Funds{
    async addFund(body){
        const {user_name,amount}=body;
        try {
            const {user_Id}= await UserData.findOne({user_name})
            const wallet = await userWallet.findOne({user_Id})
            if (wallet) {
                const update = await userWallet.findOneAndUpdate({user_Id},
                    {
                        "fund_wallet.value": wallet.fund_wallet.value + amount,
                        "fund_wallet.updated_on": new Date()
        
                      }
                )
                const tx_body = {
                    user_Id,
                    to_from:"admin",
                    tx_type: "admin_credit",
                    debit_credit: "credit",
                    source: null,
                    wallet_type: 'fund_wallet',
                    amount,
                     status: 1,
                    remark: `Recieved ${amount} fund from admin`,
                  }
                  const tarnsection = await saveTransection(tx_body);
                return {status:true,message:'Fund added successfully'};
            } else {
                return {status:false,message:'Invalid username'}
            }
           
        } catch (error) {
            return error;
        }
       
    }
}
const Fund = new Funds();
module.exports =Fund