module.exports = function(paypal,data,fn){
  var payment_details = {
  "intent": "sale",
  "payer": {
    "payment_method": "credit_card",//
    "funding_instruments": [{
      "credit_card": {
        "type": data.cardType.toLowerCase(),
        "number": data.creditCard,//4417119669820331//4391370007498401
        "expire_month": data.exMonth,
        "expire_year": data.exYear,
        "cvv2": data.cvv,
        "first_name": data.holderFirstname,
        "last_name": data.holderLastname
      }}]},
  "transactions": [{
    "amount": {
      "total": data.price,
      "currency": data.currency.toUpperCase()},
    "description": "This is the payment transaction description." }]};

  paypal.payment.create(payment_details, function(error, result){
    if(error){
      fn(error,false);
    } else {
      fn(result,true)
    }
  });
};
