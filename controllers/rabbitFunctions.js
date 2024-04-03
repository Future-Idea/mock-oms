const Order = require('../models/order')

exports.pickPackage = function(){

}

exports.getRabbitOrders = async function(){
    return(await Order.find({orderStatus:"Staged"}).lean().exec())
}

exports.getRabbitOrder = async function(id){
    return(await Order.findOne({orderId:id}).lean().exec())
 }

 exports.updateRabbitOrderStatus = async function(orderNum, status){
    const updatedOrder = await Order.findOneAndUpdate({orderId:orderNum},{orderStatus:status},{new:true})
    return(updatedOrder.orderStatus)
}