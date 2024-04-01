const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId : {type:Number},
    CustomerDetails: {
        ID: {type:Number},
        Email: {type: String},
        FirstName: {type: String},
        LastName: {type:String},
        Business: {type:String},
        IsWholesale: {type:Boolean},
        IgnoreCreditLimit: {type:Boolean}
      },
      OrderDetails: {
        CompanyID: {type:Number},
        MarketingSource: {type:String},
        SalesRepresentative: {type:String},
        IsCurrencyVisible: {type:Boolean},
        CurrencyCode: {type:String},
        CurrencyRateFromUSD: {type:Number},
        CurrencyRateToUSD: {type:Number},
        TaxExempt: {type:Boolean},
        IsQuoteOrder: {type:Boolean},
        IsSampleOrder: {type:Boolean},
        GiftOrder: {type:Boolean},
        Channel: {type:String},
        OrderSourceOrderID: {type:String},
        DisableInventoryCount: {type:Boolean},
        OrderDate: {type:Date, default:Date.now},
        EbaySellingManagerSalesRecordNumber: {type:String}
      },
      Products: [
        {
          ProductID: {type:String},
          ReferenceID: {type:String},
          ProductName: {type:String},
          SitePrice: {type:Number},
          DiscountValue: {type:Number},
          DiscountType: {type:String},
          Qty: {type:Number},
          LineTaxTotal: {type:Number},
          FinalValueFee: {type:Number},
          Notes: {type:String},
          ShipFromWareHouseID: {type:String}
        }
    ],
    ShippingAddress: {
        Business: {type:String},
        FirstName: {type:String},
        MiddleName: {type:String},
        LastName: {type:String},
        Country: {type:String},
        City: {type:String},
        State: {type:String},
        Region: {type:String},
        ZipCode: {type:String},
        Address: {type:String},
        Address2: {type:String},
        Phone: {type:String},
        Fax: {type:String}
      },
      ShippingMethodDetails: {
        Carrier: {type:String},
        ShippingMethod: {type:String},
        Weight: {
          Pounds: {type:Number},
          Ounces: {type:Number}
        },
        Dimension: {
          Width: {type:Number},
          Height: {type:Number},
          Length: {type:Number}
        },
        HandlingFee: {type:Number},
        ShippingFee: {type:Number},
        InsuranceFee: {type:Number},
        LockShippingMethod: {type:Boolean},
        RushOrder: {type:Boolean},
        RequirePinToShip: {type:Boolean},
        OtherCarrier: {type:String},
        OtherMethod: {type:String},
        PromiseDate: {type:Date, default:Date.now},
        AllowShippingEvenNotPaid: {type:Boolean}
      },
})

module.exports = mongoose.model('Order', orderSchema)