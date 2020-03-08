const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/image')
    },
    filename: function(req, file, cb){
        crypto.pseudoRandomBytes(16, function(err, raw){
            cb(null, raw.toString('hex')+ Date.now() + '.' + mime.getExtension(file.mimetype));
        })
    }
})

module.exports = multer ({
    storage: storage,
    fileFilter: function(req, file, cb){
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
          } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
    }
})