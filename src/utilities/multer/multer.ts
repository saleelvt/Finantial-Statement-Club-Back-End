import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // Files will be in memory buffer
export default upload;
