const multer = require('multer')

const multerPostConfig = {
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, './public/postPhoto');
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1]
            next(null, Date.now() + '.' + ext )
        }
    })
}

module.exports = multerPostConfig