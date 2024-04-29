// Popup.tsx
import React, { useEffect, useState } from "react";
import { formatBytesToMB } from "../lib/utils";
import {
  AccordionPopup,
  CounterCircle,
  DownloadIcon,
  LeafIcon,
  LeafyIcon,
  RefreshIcon,
  ZapIcon,
} from "./components/index";

const Popup: React.FC = () => {
  const [dataReceived, setDataReceived] = useState<number>(0);
  const [energyConsumed, setEnergyConsumed] = useState<number>(0);
  const [co2Emissions, setCo2Emissions] = useState<number>(0);

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(
        ["totalDataReceived", "totalEnergyConsumed", "totalCo2Emissions"],
        (result) => {
          setDataReceived(result.totalDataReceived || 0);
          setEnergyConsumed(result.totalEnergyConsumed || 0);
          setCo2Emissions(result.totalCo2Emissions || 0);
        }
      );
    };

    fetchData();
    chrome.storage.onChanged.addListener(fetchData);

    return () => {
      chrome.storage.onChanged.removeListener(fetchData);
    };
  }, []);

  const handleReset = () => {
    chrome.storage.local.clear();
    setDataReceived(0);
    setEnergyConsumed(0);
    setCo2Emissions(0);
  };

  return (
    <div className="px-4 py-6 bg-slate-200 rounded-3xl">
      <div className="flex items-center justify-center gap-x-1">
        <h1 className="text-center text-3xl font-bold text-green-800">
          Carbon Tracker
        </h1>
        <LeafIcon className="text-green-800" />
      </div>
      <p className="text-center text-xxs text-gray-600 dark:text-gray-300">
        Keep track of your carbon footprint
      </p>
      <hr className="w-48 h-1 mx-auto my-6 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />{" "}
      <div className="my-8 flex justify-center items-center gap-4">
        <CounterCircle
          id="dataReceived"
          value={formatBytesToMB(dataReceived)}
          icon={<DownloadIcon />}
          unit="MB"
        />
        <CounterCircle
          id="energyConsumed"
          value={energyConsumed.toFixed(2)}
          icon={<ZapIcon />}
          unit="kWh"
        />
        <CounterCircle
          id="co2Emissions"
          value={co2Emissions.toFixed(2)}
          icon={<LeafyIcon />}
          unit="kg CO2"
        />
      </div>
      <button
        className="bg-green-800 hover:bg-green-700 transition-colors flex items-center justify-center rounded-lg text-white p-2 gap-x-1"
        onClick={handleReset}
      >
        <span>reset</span> <RefreshIcon className="w-[16px] h-[16px]" />
      </button>
      <AccordionPopup />
    </div>
  );
};

export default Popup;
