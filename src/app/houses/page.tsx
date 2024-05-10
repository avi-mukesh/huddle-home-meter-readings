import Houses from "@/components/Houses";
import { EntriesSkeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Houses",
};

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Suspense fallback={<EntriesSkeleton />}>
      <Houses currentPage={currentPage} />
    </Suspense>
  );
}
