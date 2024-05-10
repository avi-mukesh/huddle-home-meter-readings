import { Reading } from "@prisma/client";
import React from "react";

type PropsType = {
  readings: Reading[];
};

export default function GasReadings({ readings }: PropsType) {
  return <div>GasReadings</div>;
}
