const order = require("../../Modals/orders");

class getOrders{
    async getAllorder(user_Id){
        const orders = await order.find({user_Id,status:1});
        return orders;
    }
}
const orderDetails = new getOrders();
module.exports = orderDetails;