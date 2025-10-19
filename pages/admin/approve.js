// pages/admin/index.js (or a new file like approve.js)
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [providers, setProviders] = useState([]);
  
  // Fetch pending providers from the database (those with approved = false)
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await fetch('/api/providers/pending'); // API that returns unapproved providers
      const data = await response.json();
      setProviders(data.providers); // Assuming the response is an object with a "providers" array
    };
    
    fetchProviders();
  }, []);

  const approveProvider = async (id) => {
    const response = await fetch(`/api/providers/approve?id=${id}`, {
      method: 'PATCH',
    });

    if (response.ok) {
      alert('Provider approved');
      setProviders(providers.filter(provider => provider.id !== id)); // Remove the approved provider from the list
    } else {
      alert('Failed to approve provider');
    }
  };

  return (
    <div>
      <h1>Pending Providers</h1>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Service</th>
            <th>District</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map(provider => (
            <tr key={provider.id}>
              <td>{provider.branch}</td>
              <td>{provider.service}</td>
              <td>{provider.district}</td>
              <td>{provider.phone}</td>
              <td>
                <button onClick={() => approveProvider(provider.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
