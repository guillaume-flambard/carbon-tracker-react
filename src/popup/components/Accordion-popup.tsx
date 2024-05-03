import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface AccordionPopupProps {}

const AccordionPopup: React.FC<AccordionPopupProps> = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="data-received">
        <AccordionTrigger>What does "Data Received" mean?</AccordionTrigger>
        <AccordionContent>
          This section displays the total amount of data your browser has
          received from websites while you browse...
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="energy-consumed">
        <AccordionTrigger>
          How is "Energy Consumed" calculated?
        </AccordionTrigger>
        <AccordionContent>
          The "Energy Consumed" metric estimates how much energy (in
          kilowatt-hours, kWh) your browsing activity consumes...
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="co2-emissions">
        <AccordionTrigger>What does "CO2 Emissions" indicate?</AccordionTrigger>
        <AccordionContent>
          This section shows the estimated carbon dioxide (CO2) emissions
          associated with your internet browsing...
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionPopup;
