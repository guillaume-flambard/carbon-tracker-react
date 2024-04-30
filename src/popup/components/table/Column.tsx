import { ColumnDef } from "@tanstack/react-table";

export interface ColumnProps {
  id: string;
  url: string;
  dataUsage: string | number;
  electricityUsage: string | number;
  carbonEmissions: string | number;
  rate: "A" | "B" | "C";
}

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "dataUsage",
    header: "Data",
  },
  {
    accessorKey: "electricityUsage",
    header: "Electricity",
  },
  {
    accessorKey: "carbonEmissions",
    header: "Emissions",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
];
