const express = require(`express`);
const path = require(`path`);

const router = express.Router();

const TextBox = require(`../model/addText`);

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

// router.post(`/addText`, (request, response) => {

//     let formattedDate = request.body.datetime.replace('T', ' ');

//     let document = new TextBox({
//         date: formattedDate,
//         topic: request.body.topic,
//         content: request.body.content
//     });

//     console.log(document);

//     document.save()
//         .then(() => {
//             response.redirect(`/`);
//         })
//         .catch((err) => {
//             console.log(err);
//             response.status(500).send('Error saving document');
//         });
// });

module.exports = router;