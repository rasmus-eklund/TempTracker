"use client";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { tempSchema, type Temp } from "~/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import Icon from "~/icons/Icon";
import { TimePickerDemo } from "./TimePicker/time-picker-demo";
import { toast } from "sonner";

type Props = { date?: Date; submit: (data: Temp) => Promise<void> };
const AddTemp = ({ date, submit }: Props) => {
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: Temp) => {
    try {
      await submit(data);
      toast.success("Added measure!");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };
  const form = useForm<Temp>({
    defaultValues: { date: date ?? new Date(), temp: 36.6 },
    resolver: zodResolver(tempSchema),
  });

  useEffect(() => {
    if (open) {
      form.setValue("date", new Date());
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center gap-4 rounded-md bg-c2 p-1 hover:bg-c3">
          <Icon icon="plus" className="size-10 fill-c4" />
          <span>Add measurement</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add measurement</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="addTempForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="temp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">DateTime</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP HH:mm:ss")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                      <div className="border-t border-border p-3">
                        <TimePickerDemo
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="flex-row justify-between">
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Close
            </Button>
          </DialogClose>
          <Button form="addTempForm" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTemp;
