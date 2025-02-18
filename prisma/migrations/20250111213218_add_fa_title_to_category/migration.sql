-- Add the `faTitle` column with a temporary default value
ALTER TABLE "Category" ADD COLUMN "faTitle" TEXT NOT NULL DEFAULT 'Default FA Title';

-- Add the `title` column with a temporary default value
ALTER TABLE "Category" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Default Title';

-- Copy the data from `name` to `title`
UPDATE "Category" SET "title" = "name";

-- Drop the old column `name`
ALTER TABLE "Category" DROP COLUMN "name";

-- Remove default values for `faTitle` and `title` (optional but recommended)
ALTER TABLE "Category" ALTER COLUMN "faTitle" DROP DEFAULT;
ALTER TABLE "Category" ALTER COLUMN "title" DROP DEFAULT;

-- Create the unique constraint for `title`
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");
