import React from "react";
import { House } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PropsType = {
  house: House;
};

export default function HouseCard({ house }: PropsType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{house.id}</CardTitle>
      </CardHeader>
      <CardContent>Address is {house.addressId}</CardContent>
    </Card>
  );
}
