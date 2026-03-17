import React from "react";

type CardProps = {
  title: string;
  children: React.ReactElement
  bgCard: string
};

const GowCard = ({ 
    title,
    children,
    bgCard
}: CardProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      
      {/* Title bar */}
      <div className={`${bgCard} text-white px-4 py-2 font-semibold text-lg`}>
        {title}
      </div>

      {/* Content area */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default GowCard;