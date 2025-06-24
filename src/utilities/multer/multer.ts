import multer from "multer";

const upload = multer({ storage: multer.memoryStorage(),
    limits: { fileSize: 200 * 1024 * 1024,
         files: 10  
     },
 }); // Files will be in memory buffer
export default upload;
