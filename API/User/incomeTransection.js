const transection = require("../../Modals/transction");
const user_data = require("./user");

class income{
    async getIncomes(user_Id,param){
        const incomes = await transection.find({user_Id,source:param,status:1});
        const newIncome = [];
        for (let index = 0; index < incomes.length; index++) {
                const {to_from,amount,level,ben_per,time,remark}=incomes[index];
                const profile = await user_data.getProfile(to_from);
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
    async getTodayIncome(user_Id,param){
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        const todayIncome = await transection.find({
          user_Id,time: {
            $gte: startOfDay,
            $lt: endOfDay,
          },source:param,
          status:1
        });
        const total_today_income = todayIncome.reduce((acc, obj) => acc + obj.amount, 0);

    return total_today_income;
    }
}
const Incomes = new income();
module.exports=Incomes;