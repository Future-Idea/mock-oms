const Order = require('../models/order');

exports.getOrderStatus = function(id, status, message){
return {
    id:id,
    status:status,
    message:message,
    Orderdata:[
        {
            "description": "sqswqswqs",
            "timestamp": "2019-11-29T12:46:21.633Z",
            "_id": "5de1131d8f7be5395080f7b9",
            "name": "topics test xqxq",
            "thumbnail": "waterfall-or-agile-inforgraphics-thumbnail-1575031579309.jpg",
            "category_id": "5de0fe0b4f76c22ebce2b70a",
            "__v": 0
        },
        {
            "description": "sqswqswqs",
            "timestamp": "2019-11-29T12:50:35.627Z",
            "_id": "5de1141bc902041b58377218",
            "name": "topics test xqxq",
            "thumbnail": "waterfall-or-agile-inforgraphics-thumbnail-1575031835605.jpg",
            "category_id": "5de0fe0b4f76c22ebce2b70a",
            "__v": 0
        },
    ] 
    }
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
      console.log("New ORder:",newOrder)
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

