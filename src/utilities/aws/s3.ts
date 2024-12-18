// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set in environment variables
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set in environment variables
//   region: process.env.AWS_REGION, // Example: 'us-east-1'
// });
// export default s3;



// /**
//  * Upload a file to S3.
//  * @param fileBuffer - The buffer of the file to be uploaded.
//  * @param fileName - The name of the file.
//  * @returns The URL of the uploaded file.
//  */
// export const uploadFileToS3 = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
//     try {
//       const params: AWS.S3.PutObjectRequest = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME!, // The bucket name (from .env)
//         Key: `pdfs/${fileName}`, // Save under "pdfs" folder
//         Body: fileBuffer, // File content as buffer
//         ContentType: "application/pdf", // Explicitly set to PDF type
//         // ACL: "public-read", // Keep files private by default
//       };
//       const options = { partSize: 10 * 1024 * 1024, queueSize: 1 }; // 10 MB parts
//       const s3Response = await s3.upload(params,options).promise();
//       return s3Response.Location; // Return the S3 file URL
//     } catch (error) {
//       console.error("Error uploading file to S3:", error);
//       throw new Error("File upload failed");
//     }
//   };


import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Create an S3 client using AWS SDK v3.
 */
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Example: 'us-east-1'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!, // Set in environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // Set in environment variables
  },
});

/**
 * Upload a file to S3 using AWS SDK v3.
 * @param fileBuffer - The buffer of the file to be uploaded.
 * @param fileName - The name of the file.
 * @returns The URL of the uploaded file.
 */
export const uploadFileToS3 = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!, // The bucket name (from .env)
      Key: `pdfs/${fileName}`, // Save under "pdfs" folder
      Body: fileBuffer, // File content as buffer
      ContentType: "application/pdf", // Explicitly set to PDF type
    };

    // Use S3Client to upload the file
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Return the file URL
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading file to S3 (v3):", error);
    throw new Error("File upload failed (v3)");
  }
};
