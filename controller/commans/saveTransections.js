const transection = require("../../Modals/transction")

const saveTransection = async(body)=>{
    const tx_id = await transection.find().count()
   const {user_Id,to_from,order_Id,tx_type,debit_credit,source,wallet_type,amount,status,remark,ben_per,level}=body;
    try {
        const trx = await new transection({
            user_Id,
            to_from,
            tx_Id:tx_id+1,
            order_Id,
            tx_type,
            debit_credit,
            source,
            wallet_type,
            amount,
            time:new Date(),
            status,
            remark
        })
        const result = await trx.save();
        // console.log(result)
        return result;
    } catch (error) {
        // console.log(error)
        return error;
    }
   
}
module.exports=saveTransection;