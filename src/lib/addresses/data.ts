import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchAddressById(id: string) {
  noStore();
  try {
    const address = await prisma.address.findFirst({ where: { id } });
    return address;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
export async function fetchCityById(id: string) {
  noStore();
  try {
    const city = await prisma.city.findFirst({ where: { id } });
    return city;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
