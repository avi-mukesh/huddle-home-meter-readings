"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState } from "react-dom";
import { createReading } from "@/lib/readings/actions";

type PropsType = {
  houseId: string;
};

export default function AddReadingDialog({ houseId }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [open, setOpen] = useState(false);
  // const [state, dispatch] = useFormState(createReading, initialState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Reading</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={createReading}>
          <DialogHeader>
            <DialogTitle>New reading</DialogTitle>
            <DialogDescription>Add meter reading for house</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="hidden"
              defaultValue={houseId}
              name="houseId"
              id="houseId"
            />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Date
              </Label>
              <Input
                type="date"
                name="date"
                id="date"
                placeholder="2000-01-01"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Select name="type">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="[Please select]" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                    <SelectItem value="GAS">Gas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Amount used
              </Label>
              <Input
                name="value"
                id="value"
                placeholder="500"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
