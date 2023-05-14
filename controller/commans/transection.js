const transection = require("../../Modals/transction")

const Transection = async({user_Id,to_from,tx_type,debit_credit,source,wallet_type,amount,status,remark})=>{
    const tx_id = await transection.find().count()
    // console.log({
    //     user_Id,to_from,tx_type,debit_credit,source,wallet_type,amount,status,remark
    // })
    const trx = await new transection({
        user_Id,
        to_from,
        tx_Id:tx_id+1,
        tx_type,
        debit_credit,
        source,
        wallet_type,
        amount,
        time:new Date(),
        status,
        remark
    })
    const result = await trx.save()
}
module.exports={Transection}