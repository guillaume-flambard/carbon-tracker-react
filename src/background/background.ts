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
  ({ responseHeaders, url }) => {
    const contentLengthHeader = responseHeaders?.find(
      (header) => header.name.toLowerCase() === "content-length"
    );
    const dataSize = parseInt(contentLengthHeader?.value || "0", 10);

    if (dataSize > 0) {
      // Only log and process HTTP or HTTPS URLs
      if (url.startsWith("http://") || url.startsWith("https://")) {
        try {
          const urlObj = new URL(url);
          const domain = urlObj.hostname;
          console.log("Processing domain:", domain);

          chrome.storage.local.get({ domains: {} }, (result) => {
            const domains = result.domains || {};
            const domainData = domains[domain] || {
              totalDataReceived: 0,
              totalEnergyConsumed: 0,
              totalCo2Emissions: 0,
              rate: "A", // Default rate
            };

            domainData.totalDataReceived += dataSize;
            domainData.totalEnergyConsumed += calculateEnergy(dataSize);
            domainData.totalCo2Emissions += calculateCO2(dataSize);

            const emissions = domainData.totalCo2Emissions;
            domainData.rate =
              emissions > 0.5 ? "C" : emissions > 0.0003 ? "B" : "A";

            domains[domain] = domainData;
            chrome.storage.local.set({ domains });

            console.log(`Updated data for ${domain}:`, domainData);
          });
        } catch (error) {
          console.error("Error parsing URL:", url, error);
        }
      } else {
        console.log("Skipped non-HTTP/HTTPS URL:", url);
      }
    }
  },
  { urls: ["<all_urls>"] }, // This will capture all URLs, but only HTTP(S) URLs are processed
  ["responseHeaders"]
);
