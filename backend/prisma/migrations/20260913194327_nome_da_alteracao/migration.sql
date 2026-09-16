/*
  Warnings:

  - You are about to drop the column `endedDate` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `startedDate` on the `projects` table. All the data in the column will be lost.
  - Added the required column `startedYear` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "endedDate",
DROP COLUMN "startedDate",
ADD COLUMN     "endedYear" INTEGER,
ADD COLUMN     "startedYear" INTEGER NOT NULL;
