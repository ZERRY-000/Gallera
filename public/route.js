const express = require(`express`);
const path = require(`path`);

const router = express.Router();

const { readdirSync } = require("fs");
const GalleryItem = require("../model/galleryItem");
const { resolve6 } = require("dns");


//file upload
const multer = require(`multer`);
const storage = multer.diskStorage({
    destination:(request, file, callback) => {
        callback(null, `./public/galleryImages`);
    },
    filename:(request, file, callback) => {
        callback(null, Date.now()+".jpg");
    }
})

const upload = multer({
    storage: storage
})

router.get(`/`, (request, response) => {
    response.render(`index.ejs`);
})

router.get(`/gallery`, (request, response) => {
    GalleryItem.find().exec()
    .then(document => {
        response.render(`gallery.ejs`,{galleryItems:document});
    })
    .catch(err => {
        console.log(err);
    })
    
})

router.get(`/addGalleryItem`, (request, response) => {
    response.render(`addGalleryItem.ejs`);
})

router.get(`/:id`, (request, response) => {
    console.log(request.params.id);

    GalleryItem.findOne({_id:request.params.id}).exec()
        .then(document => {
            console.log(document);
            response.render(`galleryPage.ejs`,{gallery_item:document});
        })
        .catch((err) => {
            console.log(err);
        })

    
})




router.post(`/sendingAddItem`, upload.single(`image`), (request, response) => {
    
    
    console.log(request.file);
    console.log(`------------------`);
    let formattedDate = request.body.datetime.replace('T', ' ');


    let document = new GalleryItem({
        image: request.file.filename,
        date: formattedDate,
        topic: request.body.topic,
        content: request.body.content
    })

    console.log(document);

    document.save()
        .then(() => {
            response.redirect(`/gallery`)
        })
        .catch((err) => {
            console.log(err);
            response.status(500).send('Error saving document');
        });

})

module.exports = router;