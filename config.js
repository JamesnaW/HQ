module.exports = {
    server: {
        host: 'localhost',
        port: 8000
    },
    database: {
        host: 'localhost',
        port: 27017,
        db: 'payment',
        username: '',
        password: ''
    },
    datatable:{
        path:'datatable.txt',
        pathTest:'datatableTest.txt'
    },
    paypal:{
        mode:'sandbox',
        // client_id:'AUJW46zCFgHw29crdXHlCpdm3285KaVibddTSanu9FKraU8lWfCinASD3Ee8yoRvPArVteI9-4Lk6yQO',
        // client_secret:'EPnkz2ixrQSaDqhNyPTDIVmWX819J-t_Fwmd45Ular_FVNS9txkzZ3INGZLdbawnHp-8HHPj4gPmvZTo'
        client_id:'AXJqTgbO7JUU1i0WEggdYOHsXRFc5Y6c_KYcVmCnVrTXHULWxoFjI5vPF2Jr25-3REBhcsSjDvrBTS9n',
        client_secret:'EH69ZvatC4yeIHD7JAqD4rGNMgIbW3xLN-wSCVeUPBxk74x1piEQtpAaRHCP5SVdjH8IIgquCcpAbYR2'
    },
    braintree:{
        environment:'sandbox',
        merchantId: '76kstmqq72g42dw3',
        publicKey: 'k2nvdw4cd467fbzt',
        privateKey: 'de9af5d94a31f6f545088cdc06e5cc1e'
    }
};
