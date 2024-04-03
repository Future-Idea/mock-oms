const Order = require('../models/order');

exports.getOrderStatus = async function(id){
   return(await Order.findOne({orderId:id}).lean().exec())
}
exports.createNewOrder = function(orderPayload){
    const newOrder = new Order({
        orderId: orderPayload.orderId,
        CustomerDetails: {
            ID: orderPayload.CustomerDetails.ID ,
            Email: orderPayload.CustomerDetails.Email,
            FirstName: orderPayload.CustomerDetails.FirstName,
            LastName: orderPayload.CustomerDetails.LastName,
            Business: orderPayload.CustomerDetails.Business,
            IsWholesale: false,
            IgnoreCreditLimit: true
          }
      });
      console.log("New Order:",newOrder)
      newOrder.save()
        .then(()=>console.log("Order Created"))
        .catch(()=>console.log(err))
    return("Order Created Succesfully")
}

exports.addOrderDoc = function(orderId, file){
    return{
        status:"Successful",
        message:`Order Document Added Successfully to order ${orderId}`,
        DocName:"ShipLabel",
        docName:file.name,
        doctype:file.mimetype
    }
}

exports.getAllOrders = async function(){
    return(await Order.find().lean().exec())
}

