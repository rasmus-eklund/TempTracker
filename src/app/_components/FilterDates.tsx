"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Icon from "~/icons/Icon";
import { FILTER_OPTIONS } from "~/lib/filterDatesOptions";

type Option = keyof typeof FILTER_OPTIONS;

type Props = { label: string; children: ReactNode };
const FilterDates = ({ label, children }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const setRange = (range: Option) => {
    const params = new URLSearchParams(searchParams);
    params.set("range", range);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Temperature by date</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"}>
              <span>{label}</span>
              <Icon icon="down" className="size-6 fill-c4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
              <DropdownMenuItem
                onClick={() => setRange(key as Option)}
                key={key}
              >
                {value.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FilterDates;
