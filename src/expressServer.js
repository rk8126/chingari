const {app} = require("./server");

app.get('/', (req, res) => {
    res.render('login')
});
app.use("/user", require("./app/routes/userRoute"));
app.use("/message", require("./app/routes/messageRoute"));

module.exports.app = app;
