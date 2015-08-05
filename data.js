module.exports = {
  data: [
    {
      payment:{
        price:1,
        currency:'USD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:4012888888881881,
        cardType:'visa',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'currency is USD then use Paypal'
    },{
      payment:{
        price:1,
        currency:'EUR',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:5555555555554444,
        cardType:'mastercard',
        exMonth:08,
        exYear:2020,
        cvv:123
      },rules:'currency is EUR then use Paypal'
    },{
      payment:{
        price:1,
        currency:'AUD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:4012888888881881,
        cardType:'visa',
        exMonth:08,
        exYear:2020,
        cvv:123
      },rules:'currency is AUD then use Paypal'
    },{
      payment:{
        price:1,
        currency:'THB',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:5105105105105100,
        cardType:'MasterCard',
        exMonth:08,
        exYear:2020,
        cvv:123
      },rules:'currency is THB then use Braintree'
    },{
      payment:{
        price:1,
        currency:'HKD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:4111111111111111,
        cardType:'VISA',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'currency is HKD then use Braintree'
    },{
      payment:{
        price:1,
        currency:'SGD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:5105105105105100,
        cardType:'MasterCard',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'currency is SGD then use Braintree'
    },{
      payment:{
        price:1,
        currency:'USD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:378282246310005,
        cardType:'amex',
        exMonth:08,
        exYear:2020,
        cvv:123
      },rules:'if credit card type is AMEX, then use Paypal'
    },{
      payment:{
        price:1,
        currency:'THB',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:378282246310005,
        cardType:'amex',
        exMonth:08,
        exYear:2020,
        cvv:123
      },rules:'if currency is not USD and credit card is AMEX, return error message, that AMEX is possible to use only for USD'
    },{
      payment:{
        price:1,
        currency:'USD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:4012888888881881,
        cardType:'mastercard',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'Wrong card type should be error Paypal'
    },{
      payment:{
        price:1,
        currency:'SGD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:5105105105105100,
        cardType:'VISA',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'Wrong card type should be error Braintree'
    },{
      payment:{
        price:1,
        currency:'USD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:1111111111111111,
        cardType:'visa',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'Wrong card number should be error Paypal'
    },{
      payment:{
        price:1,
        currency:'SGD',
        fullName:'James Collyer',
        holderFirstname:'James',
        holderLastname:'Collyer',
        creditCard:1111111111111111,
        cardType:'VISA',
        exMonth:12,
        exYear:2019,
        cvv:123
      },rules:'Wrong card number should be error Braintree'
    }
  ]
};
