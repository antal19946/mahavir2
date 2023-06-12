const order = require("../../Modals/orders")

const save_orders = async({user_Id,source,tx_type,tx_hash,package_name,order_amount,status,remark})=>{
    const order_id = await order.find().count()
    // console.log({
    //     user_Id,tx_type,package_name,order_amount,status,remark
    // })
    const odr = await new order({
        user_Id,
        source,
        order_Id:order_id+1,
        tx_type,
        tx_hash,
        package_name,
        order_amount,
        time:new Date(),
        status,
        remark
    })
    const result = await odr.save()
    return result;
}
module.exports = save_orders;