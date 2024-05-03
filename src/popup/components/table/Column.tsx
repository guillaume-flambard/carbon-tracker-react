import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export interface ColumnProps {
  id: string;
  url: string;
  dataUsage: {
    value: number;
    unit: string;
  };
  electricityUsage: {
    value: number;
    unit: string;
  };
  carbonEmissions: {
    value: number;
    unit: string;
  };
  rate: string;
}

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          className="group p-0 m-0 hover:bg-inherit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Url
          <ArrowUpDown className="ml-1 h-4 w-4 invisible group-hover:visible" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="cursor-pointer truncate max-w-20 hover:max-w-none transition-all ease-out duration-200 font-medium">
          {row.original.url}
        </p>
      );
    },
  },
  {
    accessorKey: "dataUsage.value",
    header: ({ column }) => {
      return (
        <Button
          className="group p-0 m-0 hover:bg-inherit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-1 h-4 w-4 invisible group-hover:visible" />
        </Button>
      );
    },
    // header: () => {
    //   return (
    //     <div className="flex items-center">
    //       <p>Data</p>
    //       <DownloadIcon size={15} className="ml-1" />
    //     </div>
    //   );
    // },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.dataUsage.value}
          <span className="ml-1 text-xs text-gray-500">
            {row.original.dataUsage.unit}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "electricityUsage.value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group p-0 m-0 hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Electricity
          <ArrowUpDown className="ml-1 h-4 w-4 invisible group-hover:visible" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.electricityUsage.value}
          <span className="ml-1 text-xs text-gray-500">
            {row.original.electricityUsage.unit}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "carbonEmissions.value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group p-0 m-0 hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Emissions
          <ArrowUpDown className="ml-1 h-4 w-4 invisible group-hover:visible" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="font-medium">
          {row.original.carbonEmissions.value}
          <span className="ml-1 text-xs text-gray-500">
            {row.original.carbonEmissions.unit}
          </span>
        </p>
      );
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group p-0 m-0 hover:bg-inherit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rate
          <ArrowUpDown className="ml-1 h-4 w-4 invisible group-hover:visible" />
        </Button>
      );
    },
    cell: ({ row }) => {
      switch (row.original.rate) {
        case "A":
          return (
            <Badge className="w-[25px] h-[25px] flex-col items-center justify-center bg-green-500">
              A
            </Badge>
          );
        case "B":
          return (
            <Badge className="w-[25px] h-[25px] flex-col items-center justify-center bg-orange-500">
              B
            </Badge>
          );
        case "C":
          return (
            <Badge className="w-[25px] h-[25px] flex-col items-center justify-center bg-red-500">
              C
            </Badge>
          );
      }
    },
  },
];
