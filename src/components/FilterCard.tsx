import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp, Menu, X, SlidersHorizontal } from "lucide-react";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai",
      "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Raipur", "Chandigarh",
      "Gurgaon", "Noida", "Nagpur", "UP", "Maharashtra", "Goa", "Rajasthan",
      "Punjab", "Haryana",
    ],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "MERN Stack", "HR", "Internship"],
  },
  {
    filterType: "Salary",
    array: ["0-40,000", "42-500,000", "1 Lakh - 5 Lakhs"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "4-7 years", "8-10 years"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue === "None" ? "" : selectedValue));
  }, [selectedValue]);

  return (
    <div className="sticky top-24 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 transition-all duration-300 max-w-xs w-full">
      {/* Header with Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <SlidersHorizontal className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
          Filters
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-indigo-600 border border-indigo-200 rounded-lg p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Filters Section */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden md:block ${
          isOpen
            ? "max-h-[1200px] opacity-100"
            : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
        }`}
      >
        <hr className="border-gray-200 dark:border-gray-700 mb-5" />

        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            {/* Header with Arrow */}
            <div
              className="flex justify-between items-center cursor-pointer bg-indigo-50 dark:bg-gray-800 p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
              onClick={() => toggleExpand(index)}
            >
              <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                {data.filterType}
              </h2>
              {expanded[index] ? (
                <ChevronUp className="text-indigo-600 dark:text-indigo-400" />
              ) : (
                <ChevronDown className="text-indigo-600 dark:text-indigo-400" />
              )}
            </div>

            {/* Expandable Filter Options */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expanded[index] ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              {/* "Show All / None" Option */}
              <label
                htmlFor={`none-${index}`}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                  selectedValue === "None"
                    ? "bg-indigo-100 dark:bg-indigo-900 border border-indigo-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"
                }`}
              >
                <input
                  type="radio"
                  id={`none-${index}`}
                  name={`jobFilter-${index}`}
                  value="None"
                  checked={selectedValue === "None"}
                  onChange={(e) => changeHandler(e.target.value)}
                  className="accent-indigo-600 cursor-pointer"
                />
                <Label
                  htmlFor={`none-${index}`}
                  className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  Show All / None
                </Label>
              </label>

              {/* Actual Filter Options */}
              <div className="space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `filter-${index}-${idx}`;
                  return (
                    <label
                      key={itemId}
                      htmlFor={itemId}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedValue === item
                          ? "bg-indigo-100 dark:bg-indigo-900 border border-indigo-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        id={itemId}
                        name={`jobFilter-${index}`}
                        value={item}
                        checked={selectedValue === item}
                        onChange={(e) => changeHandler(e.target.value)}
                        className="accent-indigo-600 cursor-pointer"
                      />
                      <Label
                        htmlFor={itemId}
                        className="text-gray-700 dark:text-gray-300 text-sm font-medium"
                      >
                        {item}
                      </Label>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
