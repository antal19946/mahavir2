const transection = require("../../Modals/transction");
const { User } = require("./user");

class income{
    async getIncomes(user_Id,param){
        const incomes = await transection.find({user_Id:1,source:param,status:0});
        const newIncome = [];
        for (let index = 0; index < incomes.length; index++) {
                const {to_from,amount,level,ben_per,time,remark}=incomes[index];
                const profile = await User.getProfile(to_from);
                newIncome.push({
                    to_from:profile.user_name,
                    amount,
                    level,
                    ben_per,
                    time,
                    remark
                })         
        }
        return newIncome;
    }
}
const Incomes = new income();
module.exports=Incomes;