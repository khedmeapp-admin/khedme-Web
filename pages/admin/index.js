import { useState, useEffect } from 'react';

export default function Admin() {
  const [cities, setCities] = useState('');
  const [qr, setQr] = useState(null);
  const [providers, setProviders] = useState([]);

  // Fetch pending providers on page load
  useEffect(() => {
    const fetchPendingProviders = async () => {
      const response = await fetch('/api/providers/pending');
      const data = await response.json();
      setProviders(data.providers);
    };
    fetchPendingProviders();
  }, []);

  const bulkCities = () => {
    const list = cities.split('\n').map(l => l.trim()).filter(Boolean);
    alert(`Imported ${list.length} cities`);
  };

  const saveQr = (e) => {
    const file = e.target.files[0];
    if (file) setQr(URL.createObjectURL(file));
    alert('QR uploaded');
  };

  const approveProvider = async (id) => {
    const response = await fetch(`/api/providers/approve?id=${id}`, {
      method: 'PATCH',
    });

    if (response.ok) {
      alert('Provider approved');
      setProviders(providers.filter(provider => provider.id !== id)); // Remove from pending list
    } else {
      alert('Failed to approve provider');
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>Admin Panel – بلخدمة</h1>

      <h2>1. Cities (Bulk)</h2>
      <textarea rows="10" cols="60" placeholder="Achrafieh,أشرفية,Beirut&#10;Aley,عاليه,Mount Lebanon&#10;..." value={cities} onChange={(e) => setCities(e.target.value)} />
      <br />
      <button onClick={bulkCities}>Import Cities</button>

      <h2>2. Pending Providers</h2>
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
          {providers.length > 0 ? (
            providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.branch}</td>
                <td>{provider.service}</td>
                <td>{provider.district}</td>
                <td>{provider.phone}</td>
                <td>
                  <button onClick={() => approveProvider(provider.id)}>Approve</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pending providers</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>3. Categories</h2>
      <h3>On-Site Services</h3>
      <label><input type="checkbox" defaultChecked /> Plumbing</label><br />
      <label><input type="checkbox" defaultChecked /> Electricity</label><br />
      <label><input type="checkbox" defaultChecked /> Painting</label><br />
      <label><input type="checkbox" defaultChecked /> Carpentry</label><br />
      <label><input type="checkbox" defaultChecked /> A/C Maintenance & Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Satellite & TV Installation</label><br />
      <label><input type="checkbox" defaultChecked /> Internet & Wi-Fi Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Home Deep Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Office Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Car Wash (Mobile)</label><br />
      <label><input type="checkbox" defaultChecked /> Private Tutor (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Babysitting & Child Care</label><br />
      <label><input type="checkbox" defaultChecked /> Pet Care & Dog Walking</label><br />
      <label><input type="checkbox" defaultChecked /> Furniture Assembly</label><br />
      <label><input type="checkbox" defaultChecked /> Curtain & Blinds Installation</label><br />
      <label><input type="checkbox" defaultChecked /> Wallpaper & Vinyl Wrap</label><br />
      <label><input type="checkbox" defaultChecked /> Plaster & Gypsum Board</label><br />
      <label><input type="checkbox" defaultChecked /> Tiling & Marble Works</label><br />
      <label><input type="checkbox" defaultChecked /> Flooring (Parquet, Laminate, Vinyl)</label><br />
      <label><input type="checkbox" defaultChecked /> Swimming-Pool Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Gardening & Landscaping</label><br />
      <label><input type="checkbox" defaultChecked /> Glass & Aluminium Works</label><br />
      <label><input type="checkbox" defaultChecked /> CCTV & Security Cameras</label><br />
      <label><input type="checkbox" defaultChecked /> Locksmith & Key Duplication</label><br />
      <label><input type="checkbox" defaultChecked /> Appliance Repair (Fridge, Washer, etc.)</label><br />
      <label><input type="checkbox" defaultChecked /> Water-Heater Repair</label><br />
      <label><input type="checkbox" defaultChecked /> Carpet & Sofa Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Pest Control (Cockroaches, Rats, Termites)</label><br />
      <label><input type="checkbox" defaultChecked /> Moving & Transport</label><br />
      <label><input type="checkbox" defaultChecked /> Handyman (General Fixes)</label><br />
      <label><input type="checkbox" defaultChecked /> Generator Maintenance</label><br />
      <label><input type="checkbox" defaultChecked /> Solar-Water-Heater Service</label><br />
      <label><input type="checkbox" defaultChecked /> Roofing & Leak Fix</label><br />
      <label><input type="checkbox" defaultChecked /> Junk Removal & Disposal</label><br />
      <label><input type="checkbox" defaultChecked /> Furniture-Wrapping (Moving)</label><br />
      <label><input type="checkbox" defaultChecked /> AC-Duct Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Mattress Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Kitchen-Exhaust Hood Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Septic-Tank Cleaning</label><br />
      <label><input type="checkbox" defaultChecked /> Mold Removal & Waterproofing</label><br />
      <label><input type="checkbox" defaultChecked /> Stair-Lift Installation</label><br />
      <label><input type="checkbox" defaultChecked /> Smart-Lock Installation</label><br />
      <label><input type="checkbox" defaultChecked /> Video-Doorbell Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Home-Cinema Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Coffee-Machine Repair</label><br />
      <label><input type="checkbox" defaultChecked /> Wine-Cellar Cooling Unit</label><br />
      <label><input type="checkbox" defaultChecked /> Safe-Opening & Repair</label><br />
      <label><input type="checkbox" defaultChecked /> Basketball-Hoop Assembly</label><br />
      <label><input type="checkbox" defaultChecked /> Trampoline Assembly</label><br />
      <label><input type="checkbox" defaultChecked /> Pool-Table Assembly</label><br />
      <label><input type="checkbox" defaultChecked /> Treadmill-Assembly & Repair</label><br />
      <label><input type="checkbox" defaultChecked /> Piano-Movers</label><br />
      <label><input type="checkbox" defaultChecked /> Art & Antique Handling</label><br />
      <label><input type="checkbox" defaultChecked /> Party-Tent Rental & Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Balloon-Decoration</label><br />
      <label><input type="checkbox" defaultChecked /> Chocolate-Fountain Rental</label><br />
      <label><input type="checkbox" defaultChecked /> BBQ-Grill Setup & Clean</label><br />
      <label><input type="checkbox" defaultChecked /> Personal-Chef (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Catering (Small Events)</label><br />
      <label><input type="checkbox" defaultChecked /> Birthday-Cake Delivery</label><br />
      <label><input type="checkbox" defaultChecked /> Healthy-Meal-Prep Delivery</label><br />
      <label><input type="checkbox" defaultChecked /> Nurse-Home Visit</label><br />
      <label><input type="checkbox" defaultChecked /> Elderly-Care (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Newborn-Care Specialist</label><br />
      <label><input type="checkbox" defaultChecked /> Lactation-Consultant (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Massage-Therapist (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Hairdresser (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Makeup-Artist (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Henna-Artist (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Photographer (Home)</label><br />
      <label><input type="checkbox" defaultChecked /> Drone-Photography</label><br />

      <h3>Online Services</h3>
      <label><input type="checkbox" defaultChecked /> Graphic-Design</label><br />
      <label><input type="checkbox" defaultChecked /> Logo-Design</label><br />
      <label><input type="checkbox" defaultChecked /> Brand-Identity Design</label><br />
      <label><input type="checkbox" defaultChecked /> Web-Development</label><br />
      <label><input type="checkbox" defaultChecked /> App-Development</label><br />
      <label><input type="checkbox" defaultChecked /> E-Commerce Store Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Shopify-Build</label><br />
      <label><input type="checkbox" defaultChecked /> WooCommerce-Build</label><br />
      <label><input type="checkbox" defaultChecked /> Etsy-Store Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Amazon-FBA Setup</label><br />
      <label><input type="checkbox" defaultChecked /> Dropshipping-Store Build</label><br />

      <h2>4. Payment – Wish-Money QR</h2>
      <input type="file" accept="image/*" onChange={saveQr} />
      {qr && <img src={qr} width="200" alt="QR preview" />}
    </div>
  );
}
