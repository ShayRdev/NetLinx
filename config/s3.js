// s3Service.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Create an S3 client
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function uploadFile(file) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `uploads/${file.name}`,
        Body: file,
        ContentType: file.type,
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("Successfully uploaded file: ", data);
        return data; // Return data if you want to use it later
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error; // Re-throw the error to handle it upstream
    }
}
