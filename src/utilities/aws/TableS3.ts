import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";  // Import UUID for unique names

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadTableFileToS3 = async (fileBuffer: Buffer, fileName: string): Promise<string> => {
  try {
    const fileExtension = fileName.split(".").pop(); // Extract file extension
    const contentType = mime.lookup(fileExtension || "") || "application/octet-stream"; // Detect MIME type

    // Generate a unique filename
    const uniqueFileName = `table_screenshot_${Date.now()}_${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `uploads/${uniqueFileName}`, // Save in "uploads" folder with a unique name
      Body: fileBuffer,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    
    console.log("✅ File uploaded successfully:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("❌ Error uploading file to S3:", error);
    throw new Error("File upload failed");
  }
};
