import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const PAGE_SIZE = 6;

export async function fetchHouseById(id: string) {
  noStore();
  try {
    const house = await prisma.house.findFirst({ where: { id } });
    return house;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchHouses(query: string, currentPage?: number) {
  noStore();
  if (currentPage) {
    const skip = (currentPage - 1) * PAGE_SIZE;
    try {
      const entries = await prisma.house.findMany({
        where: { address: { streetAddress: { contains: query } } },
        skip,
        take: PAGE_SIZE,
      });
      return entries;
    } catch (error) {
      console.error("Database Error:", error);
    }
  } else {
    try {
      const houses = await prisma.house.findMany();
      return houses;
    } catch (error) {
      console.error("Database Error:", error);
    }
  }
}
export async function fetchHousesPages() {
  noStore();
  try {
    const entries = await prisma.house.findMany();
    return Math.ceil(entries.length / PAGE_SIZE);
  } catch (error) {
    console.error("Database Error:", error);
  }
}
