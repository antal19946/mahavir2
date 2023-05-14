const UserData = require("../../Modals/Users");
const { User } = require("./user");

class Team{
    constructor(){

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
module.exports = {Teams}