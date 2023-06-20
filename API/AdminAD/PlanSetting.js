const plan = require("../../Modals/plan");

class setting{
    async get_SL_rank(){
        try {
            const {single_leg_plan} = await plan.findOne({'single_leg_plan.status':1});
            const {ranks}= single_leg_plan;
            return {status:true,ranks}
        } catch (error) {
            return{status:false,error}
        }
    }
    async SL_distribution_setting(body){
        try {
            const update = await plan.findOneAndUpdate({'single_leg_plan.status':1},{'single_leg_plan.ranks':body.set});
            return{status:true}
        } catch (error) {
            return{status:false,error}
        }
    }
}
const planSetting = new setting();
module.exports = planSetting;