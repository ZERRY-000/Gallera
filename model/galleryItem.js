// ใช้งาน mongoose
import mongoose from 'mongoose';


//เชื่อมไปยัง mongoDB
const DBurl = `mongodb://localhost:27017/galleryItemDB`;
mongoose.connect(DBurl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err => console.log(err));


//ออกแบบ Schema
let galleryItemSchema = mongoose.Schema({
    image: String,
    date: String,
    topic: String,
    content: String
})

// สร้างโมเดล
const GalleryItem = mongoose.model('Gallery_Items', galleryItemSchema);

// ส่งโมเดลออก

export { GalleryItem };
