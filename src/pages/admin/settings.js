// src/pages/admin/settings.js
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, PlusCircle, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [cities, setCities] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Plumbing", selected: false },
    { id: 2, name: "Electricity", selected: false },
    { id: 3, name: "Painting", selected: false },
    { id: 4, name: "Cleaning", selected: false },
  ]);
  const [qrImage, setQrImage] = useState(null);

  const handleBulkCityUpload = () => {
    if (!cities.trim()) {
      toast.error("Please enter city names first");
      return;
    }
    const cityList = cities
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    toast.success(`${cityList.length} cities uploaded successfully ✅`);
    setCities("");
  };

  const toggleCategory = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrImage(URL.createObjectURL(file));
      toast.success("QR image uploaded ✅");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-orange-500"
      >
        ⚙️ Admin Settings
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🏙 Bulk City Importer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="text-orange-500" /> Bulk City Import
          </h2>
          <textarea
            value={cities}
            onChange={(e) => setCities(e.target.value)}
            placeholder="Enter city names separated by commas, e.g. Beirut, Tripoli, Saida"
            className="w-full h-32 p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          <button
            onClick={handleBulkCityUpload}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Upload Cities
          </button>
        </motion.div>

        {/* 🧩 Category Manager */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Save className="text-orange-500" /> Manage Categories
          </h2>
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={cat.selected}
                  onChange={() => toggleCategory(cat.id)}
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() =>
              toast.success("Categories updated successfully ✅")
            }
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </motion.div>

        {/* 📷 QR Upload */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="text-orange-500" /> QR Upload
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleQRUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 file:text-sm file:font-semibold 
            file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />
          {qrImage && (
            <div className="mt-4">
              <img
                src={qrImage}
                alt="Uploaded QR"
                className="w-40 h-40 object-contain border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
