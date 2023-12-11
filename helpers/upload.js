const multer = require('multer');

//multer options and filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temp');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const multiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temp');
    },
    filename: (req, file, cb) => {
        const newFileName = new Date().getTime() + file.originalname;
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'application/pdf' ){
        cb(null, true);
    }else{
        req.isPdf = false;
        cb(null, true);
    }
};

const fileFilterPicture = (req, file, cb) => {
    console.log("Mime Type", file.mimetype);
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'application/pdf'];
    if( allowedMimeTypes.indexOf(file.mimetype) < 0 ){
        req.isPic = false;
        cb(null, true);
    }else{
        cb(null, true);
    }
}

module.exports = {fileFilter, fileFilterPicture, storage, multiStorage }; 