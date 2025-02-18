import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from './s3Client';

export const deleteFromStorage = async (bucketName: string, key: string) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key, // File name in storage
    });

    const result = await s3.send(deleteCommand);
    return {
      success: true,
      message: 'File deleted successfully!',
      result,
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      message: 'Failed to delete file.',
      error,
    };
  }
};
