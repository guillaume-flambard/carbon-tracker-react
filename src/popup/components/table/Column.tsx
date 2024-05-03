import { ColumnDef } from "@tanstack/react-table";

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
    header: "Url",
  },
  {
    accessorKey: "dataUsage.value",
    header: "Data",
  },
  {
    accessorKey: "electricityUsage.value",
    header: "Electricity",
  },
  {
    accessorKey: "carbonEmissions.value",
    header: "Emissions",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
];
