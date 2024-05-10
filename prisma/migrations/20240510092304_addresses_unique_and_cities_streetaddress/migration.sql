/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `House` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_addressId_key" ON "House"("addressId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
