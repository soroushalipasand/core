/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permission_title_key" ON "Permission"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");
