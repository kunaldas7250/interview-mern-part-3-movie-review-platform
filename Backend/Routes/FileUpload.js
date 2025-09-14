// import multer from "multer"
// import path from "path"
// import express from "express"
// const app= express()
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"upload/")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname))
//     }
// })
// const upload=multer({
//     storage,
//     limits:{fieldSize:2*1024*1024}
// })
//  app.use((err, req, res, next) => {
//    if (err instanceof multer.MulterError) {
//      if (err.code === "LIMIT_FILE_SIZE") {
//        return res.status(400).send("❌ File too large! Max size is 2 MB");
//      }
//      return res.status(400).send(`❌ Multer error: ${err.message}`);
//    } else if (err) {
//      return res.status(400).send(`❌ Error: ${err.message}`);
//    }
//    next();
//  });
// export default=upload



import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

// Export upload middleware
export default upload;
