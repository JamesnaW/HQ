module.exports = function(gateway,data,fn){
  gateway.transaction.sale({
     amount: data.price,
     merchantAccountId: data.currency.toLowerCase(),
     creditCard: {
       cardholderName: data.holderFirstname + ' ' + data.holderLastname,
       number: data.creditCard,
       cvv: data.cvv,
       expirationDate: data.exMonth+'/'+data.exYear
     }
   }, function (err, result) {
     if (err) throw err;
     if(result.success){
       if(result.transaction.creditCard.cardType.toLowerCase() != data.cardType.toLowerCase()){
         gateway.transaction.void(result.transaction.id, function (err, voidResult) {
           if (voidResult.success) {
             fn({success:false,message:'Credit card type is invalid.'},false)
            } else {
              console.log(voidResult.message);
            }
         });
       }else {
         gateway.transaction.submitForSettlement(result.transaction.id, function (err, submitResult) {
           if (submitResult.success) {
              fn(submitResult,true);
           } else {
             fn(submitResult,false);
           }
         });
       }
     }else {
       fn(result);
     }
   });
};
