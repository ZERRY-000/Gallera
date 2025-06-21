import fs from 'fs';
import path from 'path';
import { GalleryItem } from "../model/galleryItem.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const showGallery = async (request, response) => {
  GalleryItem.find().exec()
    .then(document => {
      response.render(`gallery/gallery`, { galleryItems: document });
    })
    .catch(err => {
      console.log(err);
    })
}

export const showPage = async (request, response) => {
  GalleryItem.findOne({ _id: request.params.id }).exec()
    .then(document => {
      response.render(`gallery/galleryPage.ejs`, { gallery_item: document });
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addItem = async (request, response) => {
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
}

export const deleteItem = async (request, response) => {
  GalleryItem.findOne({ _id: request.params.id }).exec()
    .then(document => {
      const imageName = document.image;
      const imagePath = `public/galleryImages/${imageName}`
      console.log(imagePath);
      fs.unlink(imagePath, err => {
        if (err) console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })

  GalleryItem.findByIdAndDelete(request.params.id, { useFindAndModify: false }).exec()
    .then(() => {
      console.log(request.params.id);

      response.redirect(`/gallery`);
    })
    .catch((err) => {
      console.log(err);
    })
}

export const editItem = (request, response) => {
  GalleryItem.findOne({ _id: request.body.edit_id }).exec()
    .then(document => {
      let formattedDate = document.date.replace(' ', 'T');
      document.date = formattedDate;
      response.render(`gallery/editItem.ejs`, { gallery_item: document });
    })
    .catch(err => {
      console.log(err);
    })
}

export const updateItem = async (request, response) => {

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
}