const express = require(`express`);
const path = require(`path`);

const router = express.Router();

const { readdirSync } = require("fs");
const GalleryItem = require("../model/galleryItem");
const { resolve6 } = require("dns");

router.get(`/`, (request, response) => {

    response.render(`index.ejs`)

    // response.sendFile(path.join(__dirname,`index.ejs`), (err) => {
    //     if(err) console.log(err);
    // })
})

router.get(`/gallery`, (request, response) => {
    response.render(`gallery.ejs`)
})

router.get(`/addGalleryItem`, (request, response) => {
    response.render(`addGalleryItem.ejs`)
})

router.post(`/sendingAddItem`, (request, response) => {
    
    console.log(request.body);
    let formattedDate = request.body.datetime.replace('T', ' ');

    let document = new GalleryItem({
        image: request.body.image,
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