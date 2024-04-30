// Popup.tsx
import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import {
  formatBytes,
  formatCO2,
  formatDomain,
  formatEnergy,
} from "../lib/utils";
import {
  AccordionPopup,
  CounterCircle,
  DownloadIcon,
  LeafIcon,
  LeafyIcon,
  RefreshIcon,
  ZapIcon,
} from "./components/index";
import { ColumnProps, columns } from "./components/table/Column";
import { DataTable } from "./components/table/Data-table";

async function getData(): Promise<ColumnProps[]> {
  return [
    {
      id: "1",
      url: "https://www.google.com",
      dataUsage: 100,
      electricityUsage: 0.02,
      carbonEmissions: 0.01,
      rate: "A",
    },
    {
      id: "2",
      url: "https://www.facebook.com",
      dataUsage: 200,
      electricityUsage: 0.04,
      carbonEmissions: 0.02,
      rate: "B",
    },
    {
      id: "3",
      url: "https://www.twitter.com",
      dataUsage: 300,
      electricityUsage: 0.06,
      carbonEmissions: 0.03,
      rate: "C",
    },
  ];
}

const Popup: React.FC = () => {
  const [data, setData] = useState<ColumnProps[]>([]);
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
      getData().then((data) => setData(data));

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

  const dataWithFormattedDomain = data.map((item) => ({
    ...item,
    url: formatDomain(item.url),
  }));

  return (
    <div className="px-4 py-6 bg-slate-200 rounded-3xl w-full relative">
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
      <Carousel>
        <CarouselContent>
          <CarouselItem>
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
          </CarouselItem>
          <CarouselItem>
            <DataTable columns={columns} data={dataWithFormattedDomain} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="!top-[-15%] !left-0" />
        <CarouselNext className="!top-[-15%] !right-0" />
      </Carousel>
      {show && <AccordionPopup />}
    </div>
  );
};

export default Popup;
