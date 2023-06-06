const express = require('express');
const router = express.Router();
const sessionHandler = require('../auth/session.js');
const dotenv = require('dotenv');
dotenv.config();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});


router.post('/',  sessionHandler.ensureAuthenticated, upload.single('flyer'), async (req, res) => {

    return res.status(200).json({message: "HELLO"});
});


module.exports = router;