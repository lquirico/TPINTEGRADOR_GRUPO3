const multer = require("multer");

// aca con diskStorage se le dice a multer donde guardar los archivos y con que nombre
const storage = multer.diskStorage({

  // aca se le dice a multer que guarde los archivos en la carpeta public/uploads
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  // aca se le dice a multer que guarde los archivos con un nombre unico (fecha + nombre original del archivo)
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }

});
// aca se le dice a multer que use el storage que se definio anteriormente
const upload = multer({
  storage
});

module.exports = upload;