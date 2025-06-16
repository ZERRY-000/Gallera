// ใช้งาน mongoose
const mongoose = require(`mongoose`);


//เชื่อมไปยัง mongoDB
const DBurl = `mongodb://localhost:27017/textboxDB`;
mongoose.connect(DBurl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err => console.log(err));


//ออกแบบ Schema
let textboxSchema = mongoose.Schema({
    date: String,
    topic: String,
    content: String
})

// สร้างโมเดล
let TextBox = mongoose.model("textBoxes", textboxSchema);

// ส่งโมเดลออก
module.exports = TextBox;
