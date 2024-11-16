import multer from "multer";

// Configure Multer to store files in memory with simple error handling

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === "application/pdf") {
      cb(null, true); // Accept file
    } else {
      cb(null, false); // Reject file, simply return `false`
    }
  },
});

export { upload };
