import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./s3Client";

export const uploadToStorage = async (
    bucketName: string,
    key: string, // File name in storage
    file: Buffer, // File buffer
    contentType: string // File MIME type (e.g., image/jpeg)
) => {
    try {
        const uploadCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: file,
            ContentType: contentType,
            ACL: 'public-read',
        });

        const result = await s3.send(uploadCommand);
        return {
            success: true,
            message: "File uploaded successfully!",
            result,
        };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            success: false,
            message: "Failed to upload file.",
            error,
        };
    }
};
