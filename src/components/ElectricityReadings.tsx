import { Reading } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { formatDateToLocal } from "@/lib/utils";

type PropsType = {
  readings: Reading[];
  streetAddress: string;
};

export default function ElectricityReadings({
  readings,
  streetAddress,
}: PropsType) {
  return (
    <Table>
      <TableCaption>
        A list of the recent electricity readings for house on {streetAddress}.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Value / kWh</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {readings.map((reading) => (
          <TableRow key={reading.id}>
            <TableCell className="font-medium">
              {formatDateToLocal(reading.date)}
            </TableCell>
            <TableCell className="text-right">{reading.readingValue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {readings.reduce((total, b) => total + b.readingValue, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
