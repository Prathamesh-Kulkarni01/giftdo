'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import BillingDetails from './BillingDetails';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';

const TableManagement = () => {
  const [tables, setTables] = useState([
    { id: 1, name: '1', capacity: 4, status: 'Available', bill: 0, orders: [] },
    {
      id: 2,
      name: '2',
      capacity: 6,
      status: 'Occupied',
      bill: 1200,
      orders: [
        { name: 'Pizza', price: 400, quantity: 2 },
        { name: 'Pasta', price: 200, quantity: 2 },
        { name: 'Pizza', price: 400, quantity: 2 },
        { name: 'Pasta', price: 200, quantity: 2 },
        { name: 'Pizza', price: 400, quantity: 2 },
        { name: 'Pasta', price: 200, quantity: 2 },
        { name: 'Pizza', price: 400, quantity: 2 },
        { name: 'Pasta', price: 200, quantity: 2 }
      ]
    },
    { id: 3, name: '3', capacity: 2, status: 'Reserved', bill: 0, orders: [] },
    { id: 4, name: '4', capacity: 4, status: 'Available', bill: 0, orders: [] }
  ]);

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [isBillingDialogOpen, setBillingDialogOpen] = useState(false);

  const selectedTable = tables.find((table) => table.id === selectedTableId) || null;

  const updateTable = (updatedTable: typeof tables[0]) => {
    const updatedTables = tables.map((table) =>
      table.id === updatedTable.id ? updatedTable : table
    );
    setTables(updatedTables);
  };

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      name: `${tables.length + 1}`,
      capacity: 4,
      status: 'Available',
      bill: 0,
      orders: []
    };
    setTables([...tables, newTable]);
  };

  const handleTableClick = (tableId: number) => {
    setSelectedTableId(tableId);
    setBillingDialogOpen(true);
  };

  return (
    <PageContainer>
      <div className="grid h-screen grid-rows-[auto_1fr]">
        <header className="p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Table Management</h2>
          <button
            className="text-sm text-blue-500"
            onClick={() => setShowConfig(!showConfig)}
          >
            {showConfig ? 'Hide' : 'Configure Tables'}
          </button>
        </header>
        <div className="flex min-h-0 flex-col md:flex-row">
          {/* Tables Section */}
          <div className="flex flex-1 flex-wrap gap-3 overflow-y-auto p-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`h-40 w-full md:w-40 text-slate-800 cursor-pointer rounded-lg border-2 p-4 ${
                  table.status === 'Available'
                    ? 'border-green-500 bg-green-100'
                    : table.status === 'Occupied'
                    ? 'border-yellow-500 bg-yellow-100'
                    : 'border-red-500 bg-red-100'
                }`}
                onClick={() => handleTableClick(table.id)}
              >
                <h3 className="text-5xl font-bold">{table.name}</h3>
                <p>Capacity: {table.capacity}</p>
                <p>Bill: ₹{table.bill}</p>
                <p>Status: {table.status}</p>
              </div>
            ))}
          </div>

          {/* Billing Details Section for larger screens */}
          <div className="hidden md:block">
            <BillingDetails
              table={selectedTable}
              onUpdateTable={(updatedTable:any) => updateTable(updatedTable)}
            />
          </div>
        </div>
        {showConfig && (
          <div className="p-4">
            <button
              className="text-sm text-green-500"
              onClick={addTable}
            >
              Add Table
            </button>
          </div>
        )}
      </div>

      {/* Billing Details Dialog for mobile */}
      <Dialog open={isBillingDialogOpen} onOpenChange={setBillingDialogOpen} modal={false}>
        <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
        <DialogContent 
        className="w-10"
        // className="fixed inset-0 z-50 flex items-end md:hidden"
        >
          <div className="relative  bg-white p-4 rounded-t-lg shadow-lg">
            <BillingDetails
              table={selectedTable}
              onUpdateTable={(updatedTable:any) => updateTable(updatedTable)}
            />
            <button
              onClick={() => setBillingDialogOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default TableManagement;

