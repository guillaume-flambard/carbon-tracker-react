import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
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
import { ColumnProps, columns } from "./components/table/Column";
import { DataTable } from "./components/table/Data-table";

interface DomainData {
  totalDataReceived: number;
  totalEnergyConsumed: number;
  totalCo2Emissions: number;
  rate: string;
}

interface StorageResult {
  domains: { [key: string]: DomainData };
}

async function getData(): Promise<ColumnProps[]> {
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

const Popup: React.FC = () => {
  const [data, setData] = useState<ColumnProps[]>([]);
  const [dataReceived, setDataReceived] = useState({ value: 0, unit: "Bytes" });
  const [energyConsumed, setEnergyConsumed] = useState({
    value: 0,
    unit: "Wh",
  });
  const [co2Emissions, setCo2Emissions] = useState({ value: 0, unit: "g" });
  const [show, setShow] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData();
        setData(newData);

        const totalValues = newData.reduce(
          (acc, domain) => ({
            totalDataReceived: acc.totalDataReceived + domain.dataUsage.value,
            totalEnergyConsumed:
              acc.totalEnergyConsumed + domain.electricityUsage.value,
            totalCo2Emissions:
              acc.totalCo2Emissions + domain.carbonEmissions.value,
          }),
          {
            totalDataReceived: 0,
            totalEnergyConsumed: 0,
            totalCo2Emissions: 0,
          }
        );

        setDataReceived(formatBytes(totalValues.totalDataReceived));
        setEnergyConsumed(formatEnergy(totalValues.totalEnergyConsumed));
        setCo2Emissions(formatCO2(totalValues.totalCo2Emissions));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    const handleChange = (
      changes: chrome.storage.StorageChange,
      areaName: string
    ) => {
      if (areaName === "local" && changes?.newValue) {
        fetchData();
      }
    };

    chrome.storage.onChanged.addListener(handleChange);

    return () => chrome.storage.onChanged.removeListener(handleChange);
  }, []);

  const handleReset = () => {
    chrome.storage.local.clear();
    setDataReceived({ value: 0, unit: "Bytes" });
    setEnergyConsumed({ value: 0, unit: "Wh" });
    setCo2Emissions({ value: 0, unit: "g" });
  };

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
      <hr className="w-48 h-1 mx-auto my-6 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <Carousel>
        <CarouselContent>
          {activeIndex === 0 && (
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
                  <span>Reset</span>{" "}
                  <RefreshIcon className="w-[16px] h-[16px]" />
                </button>
                <HelpCircle
                  className="w-[16px] h-[16px] cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => setShow(!show)}
                />
              </div>
            </CarouselItem>
          )}
          <CarouselItem>
            {activeIndex === 1 && <DataTable columns={columns} data={data} />}
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          className="!top-[-15%] !left-0"
          disabled={activeIndex === 0}
        />
        <CarouselNext
          onClick={() => setActiveIndex((prev) => Math.min(prev + 1, 1))}
          className="!top-[-15%] !right-0"
          disabled={activeIndex === 1}
        />
      </Carousel>
      {show && <AccordionPopup />}
    </div>
  );
};

export default Popup;
