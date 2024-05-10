import Houses from "@/components/Houses";
import Search from "@/components/Search";
import { EntriesSkeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Houses",
};

export default async function page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-4xl font-bold">Houses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Search houses..." />
      </div>
      <Suspense fallback={<EntriesSkeleton />}>
        <Houses query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
