const mongoose = require('mongoose');

const app = require('./app');
mongodb://yousaf:j0bTAPsABtJVXKbu@cluster0-shard-00-00.zbwmj.mongodb.net:27017,cluster0-shard-00-01.zbwmj.mongodb.net:27017,cluster0-shard-00-02.zbwmj.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-11cfqs-shard-0&authSource=admin&retryWrites=true&w=majority
//mongodb+srv://yousaf:j0bTAPsABtJVXKbu@cluster0.zbwmj.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb+srv://yousaf:j0bTAPsABtJVXKbu@cluster0.zbwmj.mongodb.net/<dbname>?retryWrites=true&w=majority


mongoose.connect("mongodb+srv://yousaf:j0bTAPsABtJVXKbu@cluster0.zbwmj.mongodb.net/natour?retryWrites=true&w=majority", {
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology: true
})
.then(con => {
    console.log("mangoose is connected");
}).catch(err => {
    console.log(err);
})
app.listen(3000, () => {
    console.log("port 3000 is now listening...");
});
