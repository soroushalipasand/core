/*
  Warnings:

  - You are about to drop the column `name` on the `Attribute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `faTitle` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add the `faTitle` column with a temporary default value
ALTER TABLE "Attribute" ADD COLUMN "faTitle" TEXT NOT NULL DEFAULT 'Default FA Title';
-- Add the `title` column with a temporary default value
ALTER TABLE "Attribute" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Default Title';
-- Copy the data from `name` to `title`
UPDATE "Attribute" SET "title" = "name";
-- Drop the old column `name`
ALTER TABLE "Attribute" DROP COLUMN "name";
-- Remove default values for `faTitle` and `title` (optional but recommended)
ALTER TABLE "Attribute" ALTER COLUMN "faTitle" DROP DEFAULT;
ALTER TABLE "Attribute" ALTER COLUMN "title" DROP DEFAULT;
-- Create the unique constraint for `title`
CREATE UNIQUE INDEX "Attribute_title_key" ON "Attribute"("title");


