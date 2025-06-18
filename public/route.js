const express = require(`express`);
const path = require(`path`);

const router = express.Router();

const fs = require(`fs`);

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

router.get('/favicon.ico', (req, res) => res.status(204).end());

router.get(`/addGalleryItem`, (request, response) => {
    response.render(`addGalleryItem.ejs`);
})

router.get(`/galleryPage-:id`, (request, response) => {

    GalleryItem.findOne({_id:request.params.id}).exec()
        .then(document => {
            response.render(`galleryPage.ejs`,{gallery_item:document});
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get(`/delete/:id`,(request, response) => {
    GalleryItem.findOne({_id:request.params.id}).exec()
    .then(document => {
        const imageName = document.image;
        const imagePath = path.join(__dirname, `galleryImages`, imageName);
        console.log(imagePath);
        fs.unlink(imagePath, err => {
            if(err) console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })

    GalleryItem.findByIdAndDelete(request.params.id, {useFindAndModify:false}).exec()
        .then(() =>{
            console.log(request.params.id);
            
            response.redirect(`/gallery`);
        })
        .catch((err) => {
            console.log(err);
        })

})

router.post(`/sendingAddItem`, upload.single(`image`), (request, response) => {
    
    
    // console.log(request.file);
    // console.log(`------------------`);
    let formattedDate = request.body.datetime.replace('T', ' ');


    let document = new GalleryItem({
        image: request.file.filename,
        date: formattedDate,
        topic: request.body.topic,
        content: request.body.content
    })

    document.save()
        .then(() => {
            response.redirect(`/gallery`)
        })
        .catch((err) => {
            console.log(err);
            response.status(500).send('Error saving document');
        });

})

router.post(`/edit`, (request, response) => {
    GalleryItem.findOne({_id:request.body.edit_id}).exec()
        .then(document => {
            let formattedDate = document.date.replace(' ', 'T');
            document.date = formattedDate;
            response.render(`editItem.ejs`,{gallery_item:document});
        })
        .catch(err => {
            console.log(err);
        })
})

router.post(`/updateItem`,(request, response) => {
    
    let formattedDate = request.body.datetime.replace('T', ' ');
    const data = {
        datetime: formattedDate,
        topic: request.body.topic,
        content: request.body.content
    };
    GalleryItem.findByIdAndUpdate(request.body._id, data).exec()
        .then(() => {
            response.redirect(`/gallery`);
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;