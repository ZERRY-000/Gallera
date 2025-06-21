import multer from 'multer';

//file upload
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, `./public/galleryImages`);
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + ".jpg");
  }
})

export const upload = multer({
  storage: storage
})

