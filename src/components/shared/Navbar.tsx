"use client";
import React from "react";

import Navlinks from "@/components/shared/Navlinks";
import { useNavbar } from "@/context/NavbarContext";
import clsx from "clsx";
import Link from "next/link";
import { Icons } from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isNavbarOpen, setIsNavbarOpen } = useNavbar();

  return (
    <div
      className={clsx("flex-none", {
        "md:w-18": !isNavbarOpen,
        "md:w-56": isNavbarOpen,
      })}
    >
      <div
        className={clsx(
          "sticky md:flex h-full flex-col px-3 pt-12 md:px-2 md:border-r md:pb-4",
          { hidden: !isNavbarOpen }
        )}
      >
        <Button
          className={clsx("hidden md:block px-2 space-y-2 mx-auto w-10 mb-2", {
            "md:mx-0 md:ml-2": isNavbarOpen,
          })}
          variant="outline"
          onClick={() => setIsNavbarOpen((b: boolean) => !b)}
        >
          {isNavbarOpen ? (
            <Icons.close className="h-6 w-6" />
          ) : (
            <Icons.menu className="h-6 w-6" />
          )}
        </Button>
        {/* move into own component */}
        <div className="md:flex flex-grow flex-row md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className="px-1">
            <Navlinks isNavbarOpen={isNavbarOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
