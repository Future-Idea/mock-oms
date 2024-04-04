const Order = require('../models/order');

exports.getOrder = async function(id){
    return(await Order.findOne({orderId:id}).lean().exec())
 }

exports.updateOrderStatus = async function(orderNum, status){
    const updatedOrder = await Order.findOneAndUpdate({orderId:orderNum},{orderStatus:status},{new:true})
    return(updatedOrder.orderStatus)
}

exports.getNewOrders = async function(){
    return(await Order.find({orderStatus:"Confirm"}).lean().exec())
}