import React from "react";
import { House } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import clsx from "clsx";
import { fetchAddressById } from "@/lib/addresses/data";
import { fetchMostRecentReadingForHouse } from "@/lib/readings/data";
import { formatDateToLocal } from "@/lib/utils";

type PropsType = {
  house: House;
};

export default async function HouseCard({ house }: PropsType) {
  const address = await fetchAddressById(house.addressId);

  const lastElectricityReading = await fetchMostRecentReadingForHouse(
    house.id,
    "ELECTRICITY"
  );
  const lastGasReading = await fetchMostRecentReadingForHouse(house.id, "GAS");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{address?.streetAddress}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold">Most recent readings</h2>
        <div>
          <p>
            Electricity:{" "}
            {lastElectricityReading ? (
              <span>
                {lastElectricityReading.readingValue} units on{" "}
                {formatDateToLocal(lastElectricityReading.date)}
              </span>
            ) : (
              "None"
            )}
          </p>
        </div>
        <div>
          <p>
            Gas:{" "}
            {lastGasReading ? (
              <span>
                {lastGasReading.readingValue} units on{" "}
                {formatDateToLocal(lastGasReading.date)}
              </span>
            ) : (
              "None"
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className={clsx(buttonVariants({ variant: "default" }), "mx-auto")}
          href={`houses/${house.id}`}
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  );
}
