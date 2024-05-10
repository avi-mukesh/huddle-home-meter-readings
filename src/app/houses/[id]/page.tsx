import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchAddressById, fetchCityById } from "@/lib/addresses/data";
import { fetchHouseById } from "@/lib/houses/data";
import { fetchReadingsForHouse } from "@/lib/readings/data";
import React from "react";
import { notFound } from "next/navigation";
import { Address } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ElectricityReadings from "@/components/ElectricityReadings";
import GasReadings from "@/components/GasReadings";
import AddReadingCallToAction from "@/components/AddReadingCallToAction";

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
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold">Meter readings</h2>
          <p className="text-xl font-semibold">
            {address?.streetAddress}, {city?.name}
          </p>
        </div>
        <div className="space-y-8 ">
          <AddReadingCallToAction />
          <Tabs defaultValue="electricity" className="space-y-4">
            <TabsList>
              <TabsTrigger value="electricity">Electricity</TabsTrigger>
              <TabsTrigger value="gas">Gas</TabsTrigger>
            </TabsList>
            <TabsContent value="electricity" className="space-y-4">
              {electricityReadings && (
                <ElectricityReadings
                  readings={electricityReadings}
                  streetAddress={address.streetAddress}
                />
              )}
            </TabsContent>
            <TabsContent value="gas" className="space-y-4">
              {gasReadings && <GasReadings readings={gasReadings} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
