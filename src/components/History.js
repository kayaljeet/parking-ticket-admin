"use client"

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
export default function History() {
  const [challans, setChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchChallans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/completed');
        setChallans(response.data);
      } catch (err) {
        console.error('Error fetching challans:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChallans();
  }, []);

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';
    setSortConfig({ key, direction });
  };

  const sortedChallans = React.useMemo(() => {
    let sortableChallans = [...challans];
    if (sortConfig.key) {
      sortableChallans.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableChallans;
  }, [challans, sortConfig]);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl font-semibold text-red-500">Error loading data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black overflow-hidden">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-grow p-8 flex flex-col">
      <div className="bg-white rounded-lg flex-1 flex flex-col p-4 sm:p-6 md:p-8 pt-16 sm:pt-20 md:pt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center md:text-left">Active Challans</h1>
        <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto h-[600px] sm:h-[600px] md:h-[600px] lg:h-[600px] scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-300 scrollbar-thumb-rounded-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">S.No.</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('layout')}>
                    Location <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'layout' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('created_at')}>
                    Time <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'created_at' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('registration_plate')}>
                    Vehicle ID <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'registration_plate' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('phone')}>
                    Complainee <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'phone' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('assigned_to')}>
                    Assigned To <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'assigned_to' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('challan_amount')}>
                    Amount <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'challan_amount' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('token_id')}>
                    Token No. <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'token_id' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('last_reviewed_by')}>
                    Last Reviewed <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'last_reviewed_by' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('last_modified')}>
                    At <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'last_modified' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort('status')}>
                    Status <ChevronDown className={`inline ml-1 h-4 w-4 ${sortConfig.key === 'status' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedChallans.map((challan, index) => (
                  <TableRow key={challan._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{challan.layout}</TableCell>
                    <TableCell>{new Date(challan.created_at).toLocaleString()}</TableCell>
                    <TableCell>{challan.registration_plate}</TableCell>
                    <TableCell>
                      {challan.phone?.startsWith('whatsapp:')
                        ? challan.phone.slice(9)
                        : challan.phone}
                    </TableCell>
                    <TableCell>{challan.assigned_to || 'Unassigned'}</TableCell>
                    <TableCell>{challan.challan_amount}</TableCell>
                    <TableCell>{challan.token_id}</TableCell>
                    <TableCell>{challan.last_reviewed_by || 'N/A'}</TableCell>
                    <TableCell>{new Date(challan.last_modified).toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                          challan.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {challan.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}