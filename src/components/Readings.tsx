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
  type: "ELECTRICITY" | "GAS";
};

export default function Readings({ readings, streetAddress, type }: PropsType) {
  return (
    <Table>
      <TableCaption>
        A list of the recent {type.toLowerCase()} readings for house on{" "}
        {streetAddress}.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Value / units</TableHead>
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
          <TableCell>Total</TableCell>
          <TableCell className="text-right">
            {readings.reduce((total, b) => total + b.readingValue, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
