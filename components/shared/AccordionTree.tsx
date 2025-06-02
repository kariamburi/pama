import React, { useState } from "react";

type CardProps = {
  data: Record<string, any>;
};

const AccordionItem = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full flex justify-between items-center py-2 px-4 bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
};

const AccordionTree = ({ data }: { data: Record<string, any> }) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <AccordionItem key={key} label={key}>
          {typeof value === "object" && !Array.isArray(value) ? (
            // Recursive case for nested objects
            <AccordionTree data={value} />
          ) : Array.isArray(value) ? (
            // Render array items
            <ul className="pl-4">
              {value.map((item, index) => (
                <li key={index} className="py-1 border-b">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            // Render primitive values (if needed)
            <span className="pl-4">{value}</span>
          )}
        </AccordionItem>
      ))}
    </div>
  );
};

export default AccordionTree;
