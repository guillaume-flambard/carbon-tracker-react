// Popup.tsx
import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatBytes, formatCO2, formatEnergy } from "../lib/utils";
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
  const [dataReceived, setDataReceived] = useState({ value: 0, unit: "Bytes" });
  const [energyConsumed, setEnergyConsumed] = useState({
    value: 0,
    unit: "Wh",
  });
  const [co2Emissions, setCo2Emissions] = useState({ value: 0, unit: "g" });
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(
        ["totalDataReceived", "totalEnergyConsumed", "totalCo2Emissions"],
        (result) => {
          setDataReceived(formatBytes(result.totalDataReceived || 0));
          setEnergyConsumed(formatEnergy(result.totalEnergyConsumed || 0));
          setCo2Emissions(formatCO2(result.totalCo2Emissions || 0));
        }
      );
    };

    fetchData();
    chrome.storage.onChanged.addListener(fetchData);

    return () => chrome.storage.onChanged.removeListener(fetchData);
  }, []);

  const handleReset = () => {
    chrome.storage.local.clear();
    setDataReceived({ value: 0, unit: "Bytes" });
    setEnergyConsumed({ value: 0, unit: "Wh" });
    setCo2Emissions({ value: 0, unit: "g" });
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
          value={dataReceived.value}
          icon={<DownloadIcon />}
          unit={dataReceived.unit}
        />
        <CounterCircle
          id="energyConsumed"
          value={energyConsumed.value}
          icon={<ZapIcon />}
          unit={energyConsumed.unit}
        />
        <CounterCircle
          id="co2Emissions"
          value={co2Emissions.value}
          icon={<LeafyIcon />}
          unit={co2Emissions.unit}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-800 hover:bg-green-700 transition-colors flex items-center justify-center rounded-lg text-white p-2 gap-x-1"
          onClick={handleReset}
        >
          <span>Reset</span> <RefreshIcon className="w-[16px] h-[16px]" />
        </button>
        <HelpCircle
          className="w-[16px] h-[16px] cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          onClick={toggleShow}
        />
      </div>
      {show && <AccordionPopup />}
    </div>
  );
};

export default Popup;
