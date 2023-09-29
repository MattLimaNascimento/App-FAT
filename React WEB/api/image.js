const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');

const pasta_imagens = path.join(__dirname, "Img")
    
router.use(fileUpload());

router.post('/', (req, res) => {
    const { file } = req.files;
    try {
        file.mv(path.join(pasta_imagens, file.name));
        res.status(200).json({ message: 'Ok' });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

module.exports = router;
