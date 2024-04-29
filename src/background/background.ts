// Interface to define the structure of data stored in chrome.storage
interface StorageData {
  totalDataReceived: number;
  totalEnergyConsumed: number;
  totalCo2Emissions: number;
}

// Converts bytes to megabytes for easier interpretation
const bytesToMegabytes = (bytes: number): number => bytes / 1000000;

// Calculates energy consumption in kWh from the number of bytes transferred
const calculateEnergy = (bytes: number): number => {
  // Assuming 0.2 kWh energy consumption per GB transferred
  return bytesToMegabytes(bytes) * 0.0002;
};

// Calculates CO2 emissions in kilograms from the number of bytes transferred
const calculateCO2 = (bytes: number): number => {
  // Assuming 0.1 kg CO2 emissions per GB transferred
  return bytesToMegabytes(bytes) * 0.0001;
};

// Listener for incoming HTTP responses
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    // Extract the 'Content-Length' header, which indicates the size of the response body
    const contentLengthHeader = details.responseHeaders?.find(
      (header) => header.name.toLowerCase() === "content-length"
    );
    const dataSize = parseInt(contentLengthHeader?.value || "0", 10);

    if (dataSize > 0) {
      // Retrieve current totals from storage
      chrome.storage.local.get(
        ["totalDataReceived", "totalEnergyConsumed", "totalCo2Emissions"],
        (result: Partial<StorageData>) => {
          // Calculate new totals
          const newTotalDataReceived =
            (result.totalDataReceived || 0) + dataSize;
          const newTotalEnergyConsumed =
            (result.totalEnergyConsumed || 0) + calculateEnergy(dataSize);
          const newTotalCo2Emissions =
            (result.totalCo2Emissions || 0) + calculateCO2(dataSize);

          // Update storage with new values
          chrome.storage.local.set({
            totalDataReceived: newTotalDataReceived,
            totalEnergyConsumed: newTotalEnergyConsumed,
            totalCo2Emissions: newTotalCo2Emissions,
          });
        }
      );
    }
  },
  { urls: ["<all_urls>"] }, // Specifies that the listener should observe all URLs
  ["responseHeaders"]
);
