// pages/Admin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ city: '', cost: '', brand: '' });

    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/api/form');
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filtered = data.filter(entry =>
        (filter.city === '' || entry.city?.toLowerCase().includes(filter.city.toLowerCase())) &&
        (filter.cost === '' || Object.values(entry.preferences).some(p =>
            p.priceRange?.toLowerCase().includes(filter.cost.toLowerCase()))) &&
        (filter.brand === '' || Object.values(entry.preferences).some(p => p.brand?.toLowerCase().includes(filter.brand.toLowerCase())))
    );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-600 mb-6">Admin Dashboard</h1>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <input
                    placeholder="City"
                    name="city"
                    value={filter.city}
                    onChange={e => setFilter({ ...filter, city: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    placeholder="Price Range"
                    name="cost"
                    value={filter.cost}
                    onChange={e => setFilter({ ...filter, cost: e.target.value })}
                    className="p-2 border rounded"
                />
                <input
                    placeholder="Brand"
                    name="brand"
                    value={filter.brand}
                    onChange={e => setFilter({ ...filter, brand: e.target.value })}
                    className="p-2 border rounded"
                />
            </div>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">City</th>
                        <th className="p-2 border">State</th>
                        <th className="p-2 border">Use Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((entry, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="p-2 border">{entry.name}</td>
                            <td className="p-2 border">{entry.city}</td>
                            <td className="p-2 border">{entry.state}</td>
                            <td className="p-2 border">{entry.useReason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-lg font-semibold">Total Entries: {filtered.length}</p>
        </div>
    );
}

export default Admin;