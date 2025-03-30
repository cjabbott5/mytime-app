import React from 'react';

const CategoryCard = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-rose-600">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
};

export default CategoryCard;
