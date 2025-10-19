import { useState } from 'react';

export default function Admin() {
  const [cities, setCities] = useState('');
  const [qr, setQr]   = useState(null);

  const bulkCities = () => {
    const list = cities.split('\n').map(l => l.trim()).filter(Boolean);
    alert(`Imported ${list.length} cities`);
  };

  const saveQr = (e) => {
    const file = e.target.files[0];
    if (file) setQr(URL.createObjectURL(file));
    alert('QR uploaded');
  };

  return (
    <div style={{padding:40,fontFamily:'Arial'}}>
      <h1>Admin Panel – بلخدمة</h1>

      <h2>1. Cities (Bulk)</h2>
      <textarea rows="10" cols="60" placeholder="Achrafieh,أشرفية,Beirut&#10;Aley,عاليه,Mount Lebanon&#10;..." value={cities} onChange={(e)=>setCities(e.target.value)} />
      <br/>
      <button onClick={bulkCities}>Import Cities</button>

      <h2>2. Categories</h2>
      <label><input type="checkbox" defaultChecked /> Plumbing</label><br/>
      <label><input type="checkbox" defaultChecked /> Electricity</label><br/>
      <label><input type="checkbox" /> Tattoo</label><br/>
      <button onClick={()=>alert('Categories saved')}>Save</button>

      <h2>3. Payment – Wish-Money QR</h2>
      <input type="file" accept="image/*" onChange={saveQr} />
      {qr && <img src={qr} width="200" alt="QR preview" />}
    </div>
  );
}
