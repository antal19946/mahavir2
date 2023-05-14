const order = require("../Modals/orders");
const plan = require("../Modals/plan");
const userWallet = require("../Modals/userWallet");

class cron{
    constructor(){}
    async roi_closing(){
        const orders = await order.find();
        for (let index = 0; index < orders.length; index++) {
            var plans =[];
            if (orders[index].source=="pin") {
                plans = await pin_details.findOne({'pin_type.package_name':orders[index].package_name})
            } else {
                plans = await plan.findOne({'package_type.package_name':orders[index].package_name})
            }
            var inc;
            if (plans.roi_income.status==1) {
                
                if (plans.roi_income.income_type.value == 'percentage') {
                    inc = orders[index].order_amount*(plans.roi_income.value/100)
                } else {
                    inc = plans.roi_income.value
                }
                const user_wallet =await userWallet.findOne({user_Id:orders[index].user_Id})
                console.log(orders[index].order_Id);
            }
            
        }
    }
}
const Crons = new cron()
module.exports ={Crons}