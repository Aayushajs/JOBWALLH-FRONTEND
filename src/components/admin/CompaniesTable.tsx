import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/redux/store";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { motion } from "framer-motion";

const CompaniesTable = () => {
  useGetAllCompanies();
  
  const { companies, searchCompanyByText } = useSelector(
    (store: RootState) => store.company
  );
  const [filterCompany, setFilterCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
    
    // Set loading to false once companies are loaded
    if (companies.length > 0) {
      setLoading(false);
    } else {
      // Add a timeout to show loading state for at least 1 second
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [companies, searchCompanyByText]);

  // Loading Animation
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2 className="w-16 h-16 text-blue-600" />
        </motion.div>
        <motion.p
          className="mt-4 text-gray-600 dark:text-gray-400 text-lg font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading companies...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Registered Companies
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          A complete list of all registered companies with details and actions.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl">
          <TableCaption className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Overview of Registered Companies
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow className="border-b border-gray-300 dark:border-gray-700">
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Logo
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Name
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Date
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Location
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Website
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700">
                Description
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany.length > 0 ? (
              filterCompany.map((company, index) => (
                <TableRow
                  key={company._id}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100/60 dark:hover:bg-gray-800/70 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-950"
                  }`}
                >
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 py-4">
                    <Avatar className="w-10 h-10 ring-2 ring-indigo-500/50 shadow-md">
                      <AvatarImage src={company.logo} alt={company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 font-medium text-gray-800 dark:text-gray-200">
                    {company.name}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {company.location}
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 text-blue-600 hover:underline dark:text-blue-400">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </TableCell>
                  <TableCell className="border-r border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                    {company.description?.length > 40
                      ? company.description.substring(0, 40) + "..."
                      : company.description}
                  </TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger>
                        <button
                          className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                          aria-label="More options"
                        >
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-2">
                        <button
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium"
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Details
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-gray-500 dark:text-gray-400 italic"
                >
                  No companies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;
