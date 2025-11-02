module.exports = [
"[project]/src/pages/provider/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ProviderDashboard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hot-toast [external] (react-hot-toast, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * Provider Dashboard - Unified version
 * - Full profile editing with category/district dropdowns (meta)
 * - Availability toggle (update-status)
 * - Available Jobs + My Applications tabs
 * - Uses NEXT_PUBLIC_API_URL if available, otherwise fallback to Render URL
 */ const API = ("TURBOPACK compile-time value", "https://khedme-api.onrender.com") || "https://khedme-api.onrender.com";
function ProviderDashboard() {
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [applications, setApplications] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [districts, setDistricts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("available");
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isUpdating, setIsUpdating] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // form state
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        full_name: "",
        phone: "",
        category_id: "",
        district_id: ""
    });
    // Load provider from localStorage and fetch all needed data
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const saved = (()=>{
            try {
                return JSON.parse(localStorage.getItem("provider"));
            } catch  {
                return null;
            }
        })();
        if (!saved) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("No provider found — please log in");
            setLoading(false);
            return;
        }
        setProvider(saved);
        setForm({
            full_name: saved.full_name || "",
            phone: saved.phone || "",
            category_id: saved.category_id ?? "",
            district_id: saved.district_id ?? ""
        });
        async function fetchAll() {
            try {
                // fetch jobs, applications and meta in parallel
                const [jobsRes, appsRes, metaRes] = await Promise.all([
                    fetch(`${API}/api/jobs/all`),
                    fetch(`${API}/api/providers/applications/${saved.id}`),
                    fetch(`${API}/api/meta`)
                ]);
                const jobsData = await jobsRes.json();
                const appsData = await appsRes.json();
                const metaData = await metaRes.json();
                setJobs(jobsData.jobs || []);
                setApplications(appsData.applications || []);
                setCategories(metaData.categories || []);
                setDistricts(metaData.districts || []);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Failed to load data");
            } finally{
                setLoading(false);
            }
        }
        fetchAll();
    }, []);
    // Toggle availability and sync with backend + localStorage
    async function toggleAvailability() {
        if (!provider) return;
        setIsUpdating(true);
        try {
            const newStatus = !provider.available;
            const res = await fetch(`${API}/api/providers/update-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    provider_id: provider.id,
                    available: newStatus
                })
            });
            const data = await res.json();
            if (data.success) {
                const updated = {
                    ...provider,
                    available: newStatus
                };
                setProvider(updated);
                localStorage.setItem("provider", JSON.stringify(updated));
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].success(newStatus ? "You are now Available ✅" : "You are now Unavailable 🚫");
            } else {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error(data.message || "Failed to update availability");
            }
        } catch (err) {
            console.error("toggleAvailability error:", err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Network error updating status");
        } finally{
            setIsUpdating(false);
        }
    }
    // Save profile updates
    async function handleProfileUpdate(e) {
        e.preventDefault();
        if (!provider) return;
        setIsUpdating(true);
        // prepare typed values (numbers or null)
        const body = {
            id: provider.id,
            full_name: form.full_name,
            phone: form.phone,
            category_id: form.category_id === "" ? null : Number(form.category_id),
            district_id: form.district_id === "" ? null : Number(form.district_id)
        };
        try {
            const res = await fetch(`${API}/api/providers/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (data.success) {
                setProvider(data.provider);
                localStorage.setItem("provider", JSON.stringify(data.provider));
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].success("Profile updated ✅");
                setEditing(false);
            } else {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error(data.message || "Failed to update profile");
            }
        } catch (err) {
            console.error("handleProfileUpdate error:", err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Network error while saving profile");
        } finally{
            setIsUpdating(false);
        }
    }
    // Apply to a job
    async function handleApply(jobId) {
        if (!provider) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Please log in");
            return;
        }
        try {
            const res = await fetch(`${API}/api/providers/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_id: jobId,
                    provider_id: provider.id,
                    message: "I'm interested in this job"
                })
            });
            const data = await res.json();
            if (data.success) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].success("Application submitted ✅");
                // append a minimal representation to applications to reflect applied state
                setApplications((prev)=>[
                        {
                            application_id: data.application?.id ?? Date.now(),
                            job_id: jobId,
                            status: "pending",
                            message: data.application?.message ?? "No message"
                        },
                        ...prev
                    ]);
            } else {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error(data.message || "Failed to apply");
            }
        } catch (err) {
            console.error("handleApply error:", err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Network error applying to job");
        }
    }
    // Loading UI
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center min-h-[70vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-gray-600 font-medium",
                    children: "Loading dashboard..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/provider/index.js",
            lineNumber: 181,
            columnNumber: 7
        }, this);
    }
    // Utility: find label by id (useful if meta arrays are objects with name/name_ar)
    const findCategoryLabel = (id)=>{
        const c = categories.find((x)=>Number(x.id) === Number(id));
        return c ? c.name || c.name_en || c.name_ar || String(c.id) : "—";
    };
    const findDistrictLabel = (id)=>{
        const d = districts.find((x)=>Number(x.id) === Number(id));
        return d ? d.name || d.name_en || d.name_ar || String(d.id) : "—";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-orange-50 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-orange-600 mb-6 text-center",
                    children: "Provider Dashboard"
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                provider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-gray-800",
                                            children: provider.full_name || "Unnamed Provider"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: [
                                                "ID: ",
                                                provider.id,
                                                " • Category: ",
                                                findCategoryLabel(provider.category_id),
                                                " • District: ",
                                                findDistrictLabel(provider.district_id)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm mt-1",
                                            children: [
                                                "Status: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: `font-medium ${provider.available ? "text-green-600" : "text-red-600"}`,
                                                    children: provider.available ? "Available" : "Unavailable"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/provider/index.js",
                                                    lineNumber: 213,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: toggleAvailability,
                                            disabled: isUpdating,
                                            className: `px-4 py-2 rounded-md text-white font-medium transition ${provider.available ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}`,
                                            children: isUpdating ? "Updating..." : provider.available ? "Set Unavailable" : "Set Available"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setEditing(!editing),
                                            className: "px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition",
                                            children: editing ? "Cancel" : "Edit Profile"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 206,
                            columnNumber: 13
                        }, this),
                        editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleProfileUpdate,
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-gray-600 mb-1",
                                            children: "Full name"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 239,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "w-full border rounded-md p-2",
                                            value: form.full_name,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    full_name: e.target.value
                                                }),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 240,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-gray-600 mb-1",
                                            children: "Phone"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "w-full border rounded-md p-2",
                                            value: form.phone,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    phone: e.target.value
                                                }),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 248,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-gray-600 mb-1",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            className: "w-full border rounded-md p-2",
                                            value: form.category_id ?? "",
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    category_id: e.target.value
                                                }),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/provider/index.js",
                                                    lineNumber: 266,
                                                    columnNumber: 21
                                                }, this),
                                                categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: c.id,
                                                        children: c.name || c.name_en || c.name_ar || c.id
                                                    }, c.id, false, {
                                                        fileName: "[project]/src/pages/provider/index.js",
                                                        lineNumber: 268,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 260,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-gray-600 mb-1",
                                            children: "District"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            className: "w-full border rounded-md p-2",
                                            value: form.district_id ?? "",
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    district_id: e.target.value
                                                }),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select district"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/provider/index.js",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this),
                                                districts.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: d.id,
                                                        children: d.name || d.name_en || d.name_ar || d.id
                                                    }, d.id, false, {
                                                        fileName: "[project]/src/pages/provider/index.js",
                                                        lineNumber: 285,
                                                        columnNumber: 23
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 277,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 275,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "md:col-span-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isUpdating,
                                        className: "w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition",
                                        children: isUpdating ? "Saving..." : "Save Changes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/provider/index.js",
                                        lineNumber: 293,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 292,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 237,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 205,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-6 space-x-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab("available"),
                            className: `px-4 py-2 rounded-md font-medium ${activeTab === "available" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`,
                            children: "Available Jobs"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab("applications"),
                            className: `px-4 py-2 rounded-md font-medium ${activeTab === "applications" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`,
                            children: "My Applications"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 303,
                    columnNumber: 9
                }, this),
                activeTab === "available" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: jobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-500",
                        children: "No jobs available yet."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/provider/index.js",
                        lineNumber: 312,
                        columnNumber: 15
                    }, this) : jobs.map((job)=>{
                        const alreadyApplied = applications.some((a)=>Number(a.job_id) === Number(job.id));
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded-lg p-5 shadow-sm bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-gray-800 text-lg",
                                                children: job.service
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 320,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "District: ",
                                                    job.district
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 321,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-2",
                                                children: job.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 322,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-orange-600 font-semibold mt-2",
                                                children: [
                                                    "$",
                                                    parseFloat(job.budget).toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 323,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/provider/index.js",
                                        lineNumber: 319,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-40 flex items-center justify-end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleApply(job.id),
                                            disabled: alreadyApplied,
                                            className: `ml-4 py-2 px-4 rounded-md font-medium transition ${alreadyApplied ? "bg-orange-100 text-gray-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`,
                                            children: alreadyApplied ? "Already Applied" : "Apply"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 327,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/provider/index.js",
                                        lineNumber: 326,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/provider/index.js",
                                lineNumber: 318,
                                columnNumber: 21
                            }, this)
                        }, job.id, false, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 317,
                            columnNumber: 19
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 310,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: applications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-center text-gray-500",
                        children: "You haven’t applied for any jobs yet."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/provider/index.js",
                        lineNumber: 344,
                        columnNumber: 15
                    }, this) : applications.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded-lg p-4 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-gray-800 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Job #",
                                                a.job_id,
                                                " — ",
                                                a.service ? a.service : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 349,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: `px-3 py-1 rounded-full text-sm font-medium ${a.status === "approved" ? "bg-green-100 text-green-700" : a.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`,
                                            children: a.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/provider/index.js",
                                            lineNumber: 350,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 348,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: a.message
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 354,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, a.application_id || a.id, true, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 347,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 342,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/provider/index.js",
            lineNumber: 200,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/provider/index.js",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__955f7bbc._.js.map