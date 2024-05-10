import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAddressById, fetchCityById } from "@/lib/addresses/data";
import { fetchHouseById } from "@/lib/houses/data";
import { fetchReadingsForHouse } from "@/lib/readings/data";
import React from "react";
import { notFound } from "next/navigation";
import { Address } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Readings from "@/components/Readings";
import AddReadingDialog from "@/components/AddReadingDialog";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;

  const house = await fetchHouseById(id);
  if (!house) {
    notFound();
  }

  const address = (await fetchAddressById(house.addressId)) as Address;

  const city = await fetchCityById(address.cityId);

  const electricityReadings = await fetchReadingsForHouse(id, "ELECTRICITY");
  const gasReadings = await fetchReadingsForHouse(id, "GAS");

  return (
    <div className="w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-4xl font-bold">Meter readings</h2>
        <p className="text-xl font-semibold">
          {address?.streetAddress}, {city?.name}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <AddReadingDialog houseId={id} />
      </div>
      <ScrollArea>
        <div className="pt-6 space-y-10 ">
          <Tabs defaultValue="electricity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="electricity">Electricity</TabsTrigger>
              <TabsTrigger value="gas">Gas</TabsTrigger>
            </TabsList>
            <TabsContent value="electricity" className="space-y-4">
              {electricityReadings && (
                <Readings
                  readings={electricityReadings}
                  type="ELECTRICITY"
                  streetAddress={address.streetAddress}
                />
              )}
            </TabsContent>
            <TabsContent value="gas" className="space-y-4">
              {gasReadings && (
                <Readings
                  readings={gasReadings}
                  type="GAS"
                  streetAddress={address.streetAddress}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
