import { formatBytes, formatCO2, formatEnergy } from "../lib/utils";
import type { ColumnProps } from "../popup/components/table/Column";

interface DomainData {
  totalDataReceived: number;
  totalEnergyConsumed: number;
  totalCo2Emissions: number;
  rate: string;
}

interface StorageResult {
  domains: { [key: string]: DomainData };
}

export async function getData(): Promise<ColumnProps[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("domains", (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error fetching data:", chrome.runtime.lastError.message);
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }

      const domainsData = (result.domains as StorageResult) || {};
      const formattedData: ColumnProps[] = Object.entries(domainsData).map(
        ([key, value]) => ({
          id: key,
          url: key,
          dataUsage: formatBytes(value.totalDataReceived),
          electricityUsage: formatEnergy(value.totalEnergyConsumed),
          carbonEmissions: formatCO2(value.totalCo2Emissions),
          rate: value.rate,
        })
      );

      resolve(formattedData);
    });
  });
}
