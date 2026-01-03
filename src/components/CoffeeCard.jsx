import React from "react";

const CoffeeCard = () => {
  return (
    <div className="bg-neutral-900 rounded-xl overflow-hidden hover:scale-[1.02] transition">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-cream">title</h3>
        <p className="text-gray-400 mt-2">description</p>
      </div>
    </div>
  );
};

export default CoffeeCard;
