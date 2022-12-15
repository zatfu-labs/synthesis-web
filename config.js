global.PORT = process.env.PORT || 3000;
global.limitCount = 50
global.accountkey = {
    recaptcha_key_1: '6LfzI6YeAAAAAKpPvC1pMtDbBDGjYC3iDC4-0Ep4',
    recaptcha_key_2: '6LfzI6YeAAAAAFrCqVBUTOJaAVAtl4gZ16vJZ2kU',
}
global.dbURI = "mongodb://admin:12345@cluster0-shard-00-00.iaiy0.mongodb.net:27017,cluster0-shard-00-01.iaiy0.mongodb.net:27017,cluster0-shard-00-02.iaiy0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1vi0h2-shard-0&authSource=admin&retryWrites=true&w=majority";