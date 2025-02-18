import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: "ir-thr-at1", // Region-e ArvanCloud Storage
    endpoint: "https://s3.ir-thr-at1.arvanstorage.ir", // URL base storage
    credentials: {
        accessKeyId: process.env.ARVAN_ACCESS_KEY as string, // Access Key
        secretAccessKey: process.env.ARVAN_SECRET_KEY as string, // Secret Key
    },
});

export default s3;
