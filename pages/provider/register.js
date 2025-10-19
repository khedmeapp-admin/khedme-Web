import { useState } from 'react';

const ON_SITE = [
  'Plumbing','Electricity','Painting','Carpentry','A/C Maintenance & Cleaning','Satellite & TV Installation','Internet & Wi-Fi Setup','Home Deep Cleaning','Office Cleaning','Car Wash (Mobile)','Private Tutor (Home)','Babysitting & Child Care','Pet Care & Dog Walking','Furniture Assembly','Curtain & Blinds Installation','Wallpaper & Vinyl Wrap','Plaster & Gypsum Board','Tiling & Marble Works','Flooring (Parquet, Laminate, Vinyl)','Swimming-Pool Cleaning','Gardening & Landscaping','Glass & Aluminium Works','CCTV & Security Cameras','Locksmith & Key Duplication','Appliance Repair (Fridge, Washer, etc.)','Water-Heater Repair','Carpet & Sofa Cleaning','Pest Control (Cockroaches, Rats, Termites)','Moving & Transport','Handyman (General Fixes)','Generator Maintenance','Solar-Water-Heater Service','Roofing & Leak Fix','Junk Removal & Disposal','Furniture-Wrapping (Moving)','AC-Duct Cleaning','Mattress Cleaning','Kitchen-Exhaust Hood Cleaning','Septic-Tank Cleaning','Mold Removal & Waterproofing','Stair-Lift Installation','Smart-Lock Installation','Video-Doorbell Setup','Home-Cinema Setup','Coffee-Machine Repair','Wine-Cellar Cooling Unit','Safe-Opening & Repair','Basketball-Hoop Assembly','Trampoline Assembly','Pool-Table Assembly','Treadmill-Assembly & Repair','Piano-Movers','Art & Antique Handling','Party-Tent Rental & Setup','Balloon-Decoration','Chocolate-Fountain Rental','BBQ-Grill Setup & Clean','Personal-Chef (Home)','Catering (Small Events)','Birthday-Cake Delivery','Healthy-Meal-Prep Delivery','Nurse-Home Visit','Elderly-Care (Home)','Newborn-Care Specialist','Lactation-Consultant (Home)','Massage-Therapist (Home)','Hairdresser (Home)','Makeup-Artist (Home)','Henna-Artist (Home)','Photographer (Home)','Drone-Photography','Photo-Booth Rental','DJ-for-House-Party','Kids-Entertainment (Clown)','Face-Painting','Bouncy-Castle Rental','Mobile-Petting-Zoo','Florist & Bouquet-Delivery','Tailor (Home Visit)','Shoe-Repair (Pick-up)','Watch-Battery Replacement','Phone-Screen Repair','Tablet-Repair (Home)','Laptop-Repair (Home)','Console-Repair (Home)','EV-Charger Installation','Car-Audio Install','Window-Tinting','Towing-Service','Battery-Replacement','Tyre-Change (Home)','Oil-Change (Home)','Brake-Pad Change','Pre-Purchase Car Inspection','Driving-Instructor (Home Pick-up)','Boat-Cleaning','Jet-Ski Service','Pool-Table Felt-Change','Safe-Moving & Installation','Mystery-Shopper Service','Personal-Assistant (Daily)','Butler Service','Private-Chef (Daily)','Nutrition-Coach','Fitness-Trainer (Home)','Yoga-Instructor (Home)','Pilates-Instructor (Home)','Life-Coach (Home)','Career-Counselling (Zoom)','Interview-Prep Coach','CV/Resume Writing','LinkedIn-Makeover','Public-Speaking Coach','Language-Conversation Partner','Baby-Sleep-Trainer','Colic-Consultant','Postpartum-Doula','Newborn-Photography','Maternity-Photography','Family-Photography','Pet-Photography','Product-Photography','Food-Photography','Real-Estate-Photography','Event-Photography','Wedding-Photography','Engagement-Photography','Birthday-Photography','Corporate-Headshots','Drone-Photography','360-Virtual-Tour','Photo-Booth Rental','Instant-Print Photo','Video-Shooting','Video-Editing','Drone-Video','Motion-Graphics','Animation-2D','Animation-3D','Whiteboard-Animation','Explainer-Video','Promo-Video','TikTok-Video Editing','Reels-Editing','YouTube-Channel Setup','Podcast-Editing','Audio-Mastering','Music-Composition','Jingle-Production','Sound-Effects Design','Voice-Over Recording','Online-Tutoring (All Subjects)','Interview-Prep Coach','Proofreading & Editing','Translation','Transcription','Subtitling & Captioning','NFT-Art Creation','Crypto-Consultation'
];

const ONLINE = [
  'Graphic-Design','Logo-Design','Brand-Identity Design','Web-Development','App-Development','E-Commerce Store Setup','Shopify-Build','WooCommerce-Build','Etsy-Store Setup','Amazon-FBA Setup','Dropshipping-Store Build','SEO Services','Social-Media Management','Digital-Marketing','Google-Ads Management','Facebook-Ads Management','Instagram-Ads Management','TikTok-Ads Management','Content-Creation','Copywriting','Email-Marketing','Newsletter-Writing','Blog-Writing','Article-Writing','Translation','Transcription','Subtitling & Captioning','Voice-Over Recording','Video-Editing','Motion-Graphics','Animation-2D','Animation-3D','Whiteboard-Animation','Explainer-Video','TikTok-Video Editing','Reels-Editing','YouTube-Channel Setup','Podcast-Editing','Audio-Mastering','Music-Composition','Jingle-Production','Sound-Effects Design','Virtual-Assistant','Data-Entry','Web-Research','Lead-Generation','CRM-Setup & Cleanup','Online-Research','Data-Analysis','Excel-Expert Services','Google-Sheets Expert','PowerPoint-Design','Canva-Design','Photo-Editing','Image-Retouching','Background-Removal','Infographic-Design','Presentation-Design','Pitch-Deck Design','Report-Design','Print-Ready Files','NFT-Art Creation','Crypto-Consultation','Online-Tutoring (All Subjects)','Interview-Prep Coach','CV/Resume Writing','LinkedIn-Makeover','Public-Speaking Coach','Language-Conversation Partner','Business-Coaching (Zoom)','Career-Coaching (Zoom)','Financial-Planning (Zoom)','Tax-Consultation (Zoom)','Investment-Consultation (Zoom)','Crypto-Consultation (Zoom)','NFT-Consultation','Online-Therapy (Zoom)','Online-Counselling (Zoom)','Online-Psychology (Zoom)','Online-Psychiatry (Zoom)','Online-Nutritionist (Zoom)','Online-Fitness-Coach (Zoom)','Online-Yoga-Instructor (Zoom)','Online-Pilates-Instructor (Zoom)','Online-Meditation-Coach (Zoom)','Online-Music-Lessons (Zoom)','Online-Art-Lessons (Zoom)','Online-Cooking-Lessons (Zoom)','Online-Dance-Lessons (Zoom)','Online-Language-Lessons (Zoom)','Online-Coding-Lessons (Zoom)','Data-Analysis (Excel, R, Python)','Survey-Design','Market-Research Report','Competitor-Analysis','Brand-Strategy Consult','Logo-Design','Brand-Identity Design','Packaging-Design','Label-Design','Menu-Design','Brochure-Design','Flyer-Design','Poster-Design','Banner-Design','Infographic-Design','Presentation-Design','Report-Design','Print-Ready Files','NFT-Art Creation','Crypto-Consultation'
];

const DISTRICTS = [
  'Achrafieh','Aley','Amioun','Baabda','Baalbek','Batroun','Bint Jbeil','Bsharri','Chouf','Dahieh','Hermel','Jbeil','Jezzine','Keserwan','Koura','Marjeyoun','Matn','Miniyeh-Danniyeh','Nabatieh','Rashaya','Saida','Sour','Tripoli','West Bekaa','Zahle','Zgharta-Ehden'
];

export default function ProviderRegister() {
  const [branch,setBranch]     = useState('');
  const [service,setService]   = useState('');
  const [district,setDistrict] = useState('');
  const [phone,setPhone]       = useState('');
  const [bio,setBio]           = useState('');
  const [price,setPrice]       = useState(10);
  const [idFile,setIdFile]     = useState(null);
  const [selfieFile,setSelfieFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idFile || !selfieFile) return alert('يرجى رفع الوثيقة والسيلفي');
    const formData = new FormData();
    formData.append('branch', branch);
    formData.append('service', service);
    formData.append('district', district);
    formData.append('phone', phone);
    formData.append('bio', bio);
    formData.append('price', price);
    formData.append('idFile', idFile);
    formData.append('selfieFile', selfieFile);

    await fetch('/api/providers', { method: 'POST', body: formData });
    alert('تم الإرسال! سيتم مراجعة طلبك خلال 24 ساعة.');
    setBranch(''); setService(''); setDistrict(''); setPhone(''); setBio(''); setPrice(10); setIdFile(null); setSelfieFile(null);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial', background: '#fff' }}>
      <h1 style={{ color: '#C32865' }}>كن مزوّد خدمة</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Branch */}
        <label>نوع الخدمة<br/>
          <select value={branch} onChange={(e)=> { setBranch(e.target.value); setService(''); }} required>
            <option value="">-- اختر الفرع --</option>
            <option value="on-site">خدمات في الموقع</option>
            <option value="online">خدمات أونلاين</option>
          </select>
        </label><br/><br/>

        {/* Service */}
        {branch && (
          <label>الخدمة الفرعية<br/>
            <select value={service} onChange={(e)=>setService(e.target.value)} required>
              <option value="">-- اختر الخدمة --</option>
              {(branch==='on-site' ? ON_SITE : ONLINE).map(c=>
                <option key={c} value={c}>{c}</option>
              )}
            </select>
          </label>
        )}<br/><br/>

        {/* District */}
        <label>القضاء<br/>
          <select value={district} onChange={(e)=>setDistrict(e.target.value)} required>
            <option value="">-- اختر القضاء --</option>
            {DISTRICTS.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </label><br/><br/>

        {/* Phone */}
        <label>رقم الهاتف (واتساب)<br/>
          <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} required placeholder="03xxxxxx"/>
        </label><br/><br/>

        {/* Bio */}
        <label>نبذة عنك<br/>
          <textarea value={bio} onChange={(e)=>setBio(e.target.value)} required rows="4" placeholder="خبراتك، شهاداتك، سبب اختيارك للخدمة..."/>
        </label><br/><br/>

        {/* Price */}
        <label>أقل سعر لزيارة / خدمة (USD)<br/>
          <input type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} min="10" required/>
        </label><br/><br/>

        {/* ID Upload */}
        <label>صورة عن الهوية / جواز السفر / رخصة السوق<br/>
          <input type="file" accept="image/*" onChange={(e)=>setIdFile(e.target.files[0])} required/>
        </label><br/><br/>

        {/* Selfie Upload */}
        <label>سيلفي وأنت تحمل نفس الوثيقة<br/>
          <input type="file" accept="image/*" onChange={(e)=>setSelfieFile(e.target.files[0])} required/>
        </label><br/><br/>

        <button type="submit" style={{ background: '#C32865', color: '#fff', padding: '10px 24px', border: 0, borderRadius: 6, cursor: 'pointer' }}>
          تقدّم بالطلب
        </button>
      </form>
    </div>
  );
}
