import express from 'express';
import path from 'path';
import { upload } from '../controllers/multer_upload.js';
import fs, { readdirSync } from 'fs';
import { GalleryItem } from '../model/galleryItem.js';
import { resolve6 } from 'dns';
import * as galleryController from '../controllers/galleryController.js';

const router = express.Router();

router.get(`/`, (request, response) => response.render("index.ejs"));
router.get('/favicon.ico', (request, response) => response.status(204).end());

//gallery
router.get(`/gallery`, galleryController.showGallery);
router.get(`/addGalleryItem`, (request, response) => response.render(`gallery/addGalleryItem.ejs`));
router.post(`/sendingAddItem`, upload.single(`image`), galleryController.addItem);
router.get(`/galleryPage/:id`, galleryController.showPage);
router.get(`/delete/:id`, galleryController.deleteItem);
router.post(`/edit`, galleryController.editItem);
router.post(`/updateItem`, galleryController.updateItem);

export default router;