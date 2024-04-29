// background.ts
interface StorageData {
  totalDataReceived: number;
  totalEnergyConsumed: number;
  totalCo2Emissions: number;
}

function bytesToMegabytes(bytes: number): number {
  return bytes / 1000000; // converting bytes to MB
}

function calculateEnergy(bytes: number): number {
  // Assuming 0.2 kWh per GB, thus 0.0002 kWh per MB
  return bytesToMegabytes(bytes) * 0.0002;
}

function calculateCO2(bytes: number): number {
  // Assuming 0.1 kg CO2 per GB, thus 0.0001 kg per MB
  return bytesToMegabytes(bytes) * 0.0001;
}

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    const size = details.responseHeaders?.find(
      (header) => header.name.toLowerCase() === "content-length"
    )?.value;
    const dataSize = parseInt(size || "0", 10);

    if (dataSize > 0) {
      chrome.storage.local.get(
        ["totalDataReceived", "totalEnergyConsumed", "totalCo2Emissions"],
        (result: Partial<StorageData>) => {
          const newTotalDataReceived =
            (result.totalDataReceived || 0) + dataSize;
          const newTotalEnergyConsumed =
            (result.totalEnergyConsumed || 0) + calculateEnergy(dataSize);
          const newTotalCo2Emissions =
            (result.totalCo2Emissions || 0) + calculateCO2(dataSize);

          chrome.storage.local.set({
            totalDataReceived: newTotalDataReceived,
            totalEnergyConsumed: newTotalEnergyConsumed,
            totalCo2Emissions: newTotalCo2Emissions,
          });
        }
      );
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
