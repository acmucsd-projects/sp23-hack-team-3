const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');
const sessionHandler = require('../auth/session.js');
const dotenv = require('dotenv');
const crypto = require('crypto'); 
dotenv.config();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex'); 
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
router.get('/profile', sessionHandler.ensureAuthenticated, eventController.getProfileEvents);
router.post('/',  sessionHandler.ensureAuthenticated, upload.single('flyer'), eventController.createEvent);

router.post('/imagetest',  /*sessionHandler.ensureAuthenticated,*/ upload.single('flyer'), async (req, res) => {
    
    console.log(req.body)
    console.log(req.file)
    const eventobj = JSON.parse(JSON.stringify(req.body));
    eventobj.tags = JSON.parse(eventobj.tags);
    console.log(req.file);
    if (!req.file)
    {
        return res.status(200).json({msg: "img failed. no given image "});
    }
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: randomImageName(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return res.status(200).json({msg: "img upload success!!!"});
});


//DONT ADD THESE ROUTES UNTIL AUTHENTICATION PROPERLY SETUP (DO IT LATER)
router.delete('/:id', sessionHandler.ensureAuthenticated, eventController.deleteEvent);
//router.patch('/:id', eventController.updateEvent);
// router.get('/:id', eventController.getEvent);


module.exports = router;