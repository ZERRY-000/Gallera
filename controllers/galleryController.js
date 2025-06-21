import { GalleryItem } from "../model/galleryItem";
export const showGalleryPage =  async (request, response) => {
    GalleryItem.find().exec()
    .then(document => {
        response.render(`gallery/gallery`,{galleryItems:document});
    })
    .catch(err => {
        console.log(err);
    })
}