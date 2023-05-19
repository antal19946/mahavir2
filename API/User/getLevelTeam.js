const UserData = require("../../Modals/Users");
const  homeData  = require("./homeData");
const  User  = require("./user");

class Team{
    constructor(){
        // this.getDirectTeam(1).then(e=>console.log(e))
    }
    async getDirectTeam(user_Id){
        const level_1 = await UserData.find({sponsor_Id:user_Id});
        const direct=[];
        for (let index = 0; index < level_1.length; index++) {
            let{user_Id,user_name,status,joining_date,Activation_date,sponsor_Id}=level_1[index]
            const profile = await User.getProfile(sponsor_Id)
            const getInvest = await homeData.getSelfInvestment(user_Id)
            const update = {user_Id,user_name,status,joining_date,Activation_date,investment:getInvest,sponsor:profile.user_name};
            direct.push(update)
        }
        return direct;
    }
    async getLevelTeam(user_Id,level){
        const level_team = []
        const level_1 = await UserData.find({sponsor_Id:user_Id})
        level_team.push(level_1)
        
        for(let i = 0;i<level;i++){
            var obj = []
             level_team[i].map((item)=>  obj.push(item?.user_Id))
            const levelTeam = await UserData.find({ sponsor_Id: { $in: obj } })
            if(levelTeam.length<1){
                break;
            }else{
                level_team.push(levelTeam)
                obj= []

            }
            console.log(level_team.length)
        }
        // const objectIds = ['982130','797173']
        return level_team
    }
}
const Teams = new Team();
module.exports = Teams