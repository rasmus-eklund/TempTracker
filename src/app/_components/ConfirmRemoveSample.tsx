"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Icon from "~/icons/Icon";
import { removeSample } from "~/server/api/temps";

type Props = { id: string };

const ConfirmRemoveSample = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [removing, setRemoving] = useState(false);
  const handleRemove = async () => {
    try {
      setRemoving(true);
      await removeSample(id);
      toast.success("Successfully removed!");
    } catch (error) {
      toast.error("Failed to remove...");
    }
    setRemoving(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Icon icon="close" className="size-6 fill-c4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove data point?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose asChild>
            <Button variant="secondary">Abort</Button>
          </DialogClose>
          <Button disabled={removing} onClick={handleRemove}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRemoveSample;
