interface StorageData {
  totalDataReceived: number;
  totalEnergyConsumed: number;
  totalCo2Emissions: number;
}

// Helper function to convert bytes to megabytes
const bytesToMegabytes = (bytes: number): number => bytes / 1e6;

// Calculates the energy consumption in kWh from bytes
const calculateEnergy = (bytes: number): number =>
  bytesToMegabytes(bytes) * 0.0002;

// Calculates the CO2 emissions in kg from bytes
const calculateCO2 = (bytes: number): number =>
  bytesToMegabytes(bytes) * 0.0001;

// Listener for received headers to track data usage, energy, and emissions
chrome.webRequest.onHeadersReceived.addListener(
  ({ responseHeaders }) => {
    const contentLengthHeader = responseHeaders?.find(
      (header) => header.name.toLowerCase() === "content-length"
    );
    const dataSize = parseInt(contentLengthHeader?.value || "0", 10);

    if (dataSize > 0) {
      chrome.storage.local.get(
        ["totalDataReceived", "totalEnergyConsumed", "totalCo2Emissions"],
        (result) => {
          const updatedData: StorageData = {
            totalDataReceived: (result.totalDataReceived || 0) + dataSize,
            totalEnergyConsumed:
              (result.totalEnergyConsumed || 0) + calculateEnergy(dataSize),
            totalCo2Emissions:
              (result.totalCo2Emissions || 0) + calculateCO2(dataSize),
          };

          chrome.storage.local.set(updatedData);
        }
      );
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
