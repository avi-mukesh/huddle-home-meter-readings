import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchMostRecentReadingForHouse(
  houseId: string,
  type: "ELECTRICITY" | "GAS"
) {
  noStore();
  try {
    const readings = await prisma.reading.findMany({
      where: { houseId, type },
      orderBy: { date: "desc" },
      take: 1,
    });
    return readings[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchReadingsForHouse(
  houseId: string,
  type: "ELECTRICITY" | "GAS"
) {
  noStore();
  try {
    const readings = await prisma.reading.findMany({
      where: { houseId, type },
      orderBy: { date: "desc" },
    });
    return readings;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
