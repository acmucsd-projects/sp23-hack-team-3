const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

const uploadImageFile()
{
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: "TODO",
        Body: "TODO",
        ContentType: "TODO",
    }
    const command = new PutObjectCommand(params);
}

