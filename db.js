const mongoose = require('mongoose')

mongoose.connect(
    'mongodb://localhost:27017/darts', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
).then(console.log('DB Connection Successfull'))
    .catch((err) => {
        console.error(err);
    });

mongoose.connection.on('error', err => {
    console.log(err);
});
module.exports = mongoose