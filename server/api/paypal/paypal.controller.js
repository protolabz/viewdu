'use strict';
var paypal = require('paypal-rest-sdk');
var config = {};
var fs = require('file-system');

class PayPalController {
    constructor() {
        //Test user: user@wetware.com.au -> password: v1ewdu-core
        this.paymentPayPal = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://10.4.20.55:8080/paypal/created",
            "cancel_url": "http://10.4.20.55:8080/paypal/canceled"
        },
        "transactions": [{
            "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
            "amount": {
            "total": "5.00",
            "currency": "USD"
            },
            "description": "My awesome payment"
        }]
        };

        this.paymentCreditCard = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
            "credit_card": {
                "number": "5500005555555559",
                "type": "mastercard",
                "expire_month": 12,
                "expire_year": 2018,
                "cvv2": 111,
                "first_name": "Joe",
                "last_name": "Shopper"
            }
            }]
        },
        "transactions": [{
            "amount": {
            "total": "5.00",
            "currency": "USD"
            },
            "description": "My awesome payment"
        }]
        };
    }


    /*
    * Initialise paypal configurations
    */
    init(){
        var config = {
                mode: process.env.PAYPAL_MODE,
                client_id: process.env.PAYPAL_CLIENTID,
                client_secret: process.env.PAYPAL_SECRET,
                headers : {
                    custom: process.env.PAYPAL_HEADERS_CUSTOM
                }
            }
        paypal.configure(config);
    }

    create(req, res){
        var transaction = req.body;
        console.log('payment transaction:',transaction);
        paypal.payment.create(transaction, function (error, payment) {
            if (error) {
                console.log('payment error:',error);
                res.status(404).json(error);
            } else {
                console.log('payment success:',payment);
                res.status(201).json(payment);
            }
        });
    }

    approvalReturn(req, res){
        //var paymentId = req.params.paymentId;
        var returnData = req.query;
        console.log('approval returned data:',returnData);
        res.status(200).json({ title:"PayPal", process:'PAYPAL', state: 'success', data: returnData});
    }

    execute(req, res){
        var paymentId = req.body.paymentId;
        var payerId = req.body.PayerID;
        var details = { "payer_id": payerId };
        paypal.payment.execute(paymentId, details, function (error, payment) {
            if (error) {
            console.log(error);
            } else {
            console.log('successful payment',payment);
            res.status(201).json(payment);
            }
        });
    };

    cancel(req, res){
        var paymentId = req.params.paymentId;
        var returnData = req.query;
        console.log('approval returned data:',returnData);
        res.status(404).json(returnData);
    };
}

module.exports = PayPalController;