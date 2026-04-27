/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profissional` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Profissional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Profissional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profissional" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");
