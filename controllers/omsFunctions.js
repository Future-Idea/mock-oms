const Order = require('../models/order');
const OrderDoc = require('../models/orderDoc');

exports.getOrderStatus = async function (id) {
  return (await Order.findOne({ orderId: id }).lean().exec())
}

exports.createNewOrder = function (orderPayload) {
  const newOrder = new Order({
    orderId: orderPayload.orderId,
    orderStatus: 'Confirm',
    CustomerDetails: {
      ID: orderPayload.CustomerDetails.ID,
      Email: orderPayload.CustomerDetails.Email,
      FirstName: orderPayload.CustomerDetails.FirstName,
      LastName: orderPayload.CustomerDetails.LastName,
      Business: orderPayload.CustomerDetails.Business,
      IsWholesale: false,
      IgnoreCreditLimit: true
    },
    OrderDetails: {
      OrderSourceOrderID: orderPayload.OrderDetails?.OrderSourceOrderID,
    },
    ShippingMethodDetails: { // Including in create for now to store recommended packages
      Weight: {
        Pounds: orderPayload.ShippingMethodDetails?.Weight?.Pounds,
        Ounces: orderPayload.ShippingMethodDetails?.Weight?.Ounces,
      },
      Dimension: {
        Width: orderPayload.ShippingMethodDetails?.Dimension?.Width,
        Height: orderPayload.ShippingMethodDetails?.Dimension?.Height,
        Length: orderPayload.ShippingMethodDetails?.Dimension?.Length,
      }
    },
    Products: [{
      ProductID: orderPayload.Products?.[0]?.ProductID,
      ShipFromWareHouseID: orderPayload.Products?.[0]?.ShipFromWareHouseID,
    }]
  });
  newOrder.save()
    .then(() => console.log("Order Created"))
    .catch(() => console.log(err))
  return (newOrder)
}

exports.addOrderDoc = function (orderId, file) {
  const doc = new OrderDoc({
    OrderId: orderId,
    File: {
      FileContent: file.FileContent,
      FileName: file.FileName
    }
  });
  doc.save()
    .then(() => console.log("Document saved for %d", orderId))
    .catch(() => console.log(err))
  return (doc)
}

exports.getOrderDoc = async function (id) {
  const doc = await OrderDocument.findOne({ orderId: id }).lean().exec()
  return (doc)
}

exports.getAllOrders = async function () {
  return (await Order.find().lean().exec())
}

exports.rejectOrder = async function (id) {
  const updatedOrder = await Order.findOneAndUpdate({ orderId: id }, { orderStatus: "Rejected" }, { new: true })
  return (updatedOrder)
}

exports.updateOmsOrderStatus = async function (orderNum, status) {
  const updatedOrder = await Order.findOneAndUpdate({ orderId: orderNum }, { orderStatus: status }, { new: true })
  return (updatedOrder.orderStatus)
}

exports.deleteOMSOrder = async function (id) {
  return (await Order.deleteOne({ orderId: id }))
}
