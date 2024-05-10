-- CreateEnum
CREATE TYPE "ReadingType" AS ENUM ('ELECTRICITY', 'GAS');

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "houseId" TEXT NOT NULL,
    "readingValue" INTEGER NOT NULL,
    "type" "ReadingType" NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
