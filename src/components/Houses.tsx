import { fetchHouses, fetchHousesPages } from "@/lib/houses/data";
import React from "react";
import HouseCard from "@/components/HouseCard";
import Pagination from "@/components/shared/Pagination";

type PropsType = {
  query: string;
  currentPage: number;
};

export default async function Houses({ query, currentPage }: PropsType) {
  const houses = await fetchHouses(query, currentPage);
  const totalPages = await fetchHousesPages();
  return (
    <>
      <div className="py-4 mx-auto grid gap-2 grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2">
        {houses?.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
}
