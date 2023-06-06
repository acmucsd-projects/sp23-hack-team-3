const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');
const sessionHandler = require('../auth/session.js');

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

//actual routing, revamped (following charvi example code)
router.get('/', eventController.getEvents);
// router.get('/:id', eventController.getEvent);
router.get('/profile', sessionHandler.ensureAuthenticated, eventController.getProfileEvents);
router.post('/',  sessionHandler.ensureAuthenticated, upload.single('image'), eventController.createEvent);


//DONT ADD THESE ROUTES UNTIL AUTHENTICATION PROPERLY SETUP (DO IT LATER)
//router.delete('/:id', eventController.deleteEvent);
//router.patch('/:id', eventController.updateEvent);
// router.get('/:id', eventController.getEvent);


module.exports = router;