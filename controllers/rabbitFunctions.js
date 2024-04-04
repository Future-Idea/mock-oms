const Order = require('../models/order')

exports.pickPackage = function(){

}

exports.getRabbitOrders = async function(){
    const statusFilters = ["Staged", "Shipped"];
    return(await Order.find({orderStatus: { $in: statusFilters }}).lean().exec())
}

exports.getRabbitOrder = async function(id){
    return(await Order.findOne({orderId:id}).lean().exec())
 }

 exports.updateRabbitOrderStatus = async function(orderNum, status){
    const updatedOrder = await Order.findOneAndUpdate({orderId:orderNum},{orderStatus:status},{new:true})
    return(updatedOrder.orderStatus)
}
