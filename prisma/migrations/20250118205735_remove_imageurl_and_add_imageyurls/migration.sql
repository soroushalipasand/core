-- Add the imageUrls column
ALTER TABLE "Product"
ADD COLUMN "imageUrls" TEXT[] DEFAULT '{}'::TEXT[];

-- Update the imageUrls column with the value from imageUrl column
UPDATE "Product"
SET "imageUrls" = ARRAY["imageUrl"]
WHERE "imageUrl" IS NOT NULL;

-- Drop the imageUrl column
ALTER TABLE "Product" DROP COLUMN "imageUrl";