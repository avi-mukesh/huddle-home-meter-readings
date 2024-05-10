"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ReadingFormState = {
  errors?: {
    houseId?: string[];
    value?: string[];
    date?: string[];
  };
  message?: string | null;
};

export async function createReading(formData: FormData) {
  const date = formData.get("date") as string;
  const value = formData.get("value") as string;
  const type = formData.get("type") as "ELECTRICITY" | "GAS";
  const houseId = formData.get("houseId") as string;
  try {
    await prisma.reading.create({
      data: {
        houseId,
        readingValue: Number(value),
        type,
        date: new Date(date),
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to create reading entry." };
  }

  revalidatePath(`/houses/${houseId}`);
}
