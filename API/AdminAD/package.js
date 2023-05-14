const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const plan = require("../../Modals/plan");

class Pack{
    constructor(){

    }
     generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
    async generatePin(body){
        const {package_name,user_Id,number_of_pin}=body;
        const pin_type = await plan.findOne({'package_type.package_name':package_name})
        const isUser = await UserData.findOne({user_Id:user_Id})
        if (pin_type) {
            if (isUser) {
                for(let i =0;i<number_of_pin;i++){
                    try{
        
                        const ePin = new EpinData({
                            pin:this.generateString(10),
                            user_Id:user_Id,
                            created_by:'admin',
                            pin_type:package_name,
                            created_on:new Date()
                        })
                        console.log(ePin)
                        const pin = await ePin.save();
                        // return{status:true}
                    }catch(e){
                        return{status:false,e}
                    }
                }
                return {status:true}
            } else {
                return{status:false,message:"user not exist"}
            }
           
        } else {
            return{status:false,message:"this type of pin not available"}
        }
        
    }
    async createPackage(body){
        const ranks = [
            {
              "min_investment": 2000,
              "max_investment": 4999,
              "value": 5
            },
            {
              "min_investment": 5000,
              "max_investment": 10999,
              "value": 7
            },
            {
              "min_investment": 11000,
              "max_investment": 24999,
              "value": 9
            },
            {
              "min_investment": 25000,
              "max_investment": 59999,
              "value": 11
            },
            {
              "min_investment": 60000,
              "max_investment": 124999,
              "value": 13
            },
            {
              "min_investment": 125000,
              "max_investment": 269999,
              "value": 16
            },
            {
              "min_investment": 270000,
              "max_investment": 499999,
              "value": 19
            },
            {
              "min_investment": 600000,
              "max_investment": 1499999,
              "value": 22
            },
            {
              "min_investment": 1500000,
              "max_investment": 3999999,
              "value": 27
            },
            {
              "min_investment": 4000000,
              "max_investment": 1000000000,
              "value": 31
            }
          ];
        try {
            const {package_name,min_amount,mex_amount} = body
            const advanceInfo = await advance_info.findOne()
            if (advanceInfo.Investment.topup_type.value == "pin") {
                const Pack = new plan({
                    package_type:{
                        package_name,
                        package_type:'pin',
                        min_amount:mex_amount,
                        mex_amount,
                        added_on:new Date()              
                       }
                    });
                    const e_pin = await Pack.save();
                    return {status:true,e_pin};
                } else {
                const Pack = new plan({
                    package_type:{
                        package_name,
                        package_type:'fund',
                        min_amount,
                        mex_amount,
                        added_on:new Date()              
                       }
                    });
                    const pack = await Pack.save();
                    return {status:true,pack};
            }
        } catch (error) {
            return {status:false,error};
        }
        
    }
}
const Package =new Pack();
module.exports ={Package}