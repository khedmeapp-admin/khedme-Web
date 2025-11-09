module.exports = [
"[project]/src/pages/jobs.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/pages/jobs.js
__turbopack_context__.s([
    "default",
    ()=>JobsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hot-toast [external] (react-hot-toast, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function JobsPage() {
    const API_BASE = "https://khedme-api.onrender.com";
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [appliedJobs, setAppliedJobs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [justApplied, setJustApplied] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // ✅ Load provider from localStorage
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const stored = localStorage.getItem("provider");
        if (stored) setProvider(JSON.parse(stored));
    }, []);
    // ✅ Fetch all jobs
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const fetchJobs = async ()=>{
            try {
                const res = await fetch(`${API_BASE}/api/jobs/all`);
                const data = await res.json();
                if (data.success) setJobs(data.jobs);
                else __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Failed to load jobs");
            } catch (err) {
                console.error(err);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Error fetching jobs");
            } finally{
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    // ✅ Fetch provider's applications
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!provider) return;
        const fetchApplications = async ()=>{
            try {
                const res = await fetch(`${API_BASE}/api/providers/applications/${provider.id}`);
                const data = await res.json();
                if (data.success) {
                    const ids = data.applications.map((a)=>a.job_id);
                    setAppliedJobs(ids);
                }
            } catch (err) {
                console.error("Error fetching applications:", err);
            }
        };
        fetchApplications();
    }, [
        provider
    ]);
    // ✅ Handle Apply Now
    const handleApply = async (jobId)=>{
        if (!provider) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Please log in as a provider first.");
            return;
        }
        if (appliedJobs.includes(jobId)) {
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"])("⚠️ You already applied for this job");
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/providers/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_id: jobId,
                    provider_id: provider.id,
                    message: "I'm interested in this job."
                })
            });
            const data = await res.json();
            if (data.success) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].success("Application sent successfully ✅");
                setAppliedJobs((prev)=>[
                        ...prev,
                        jobId
                    ]);
                setJustApplied(jobId);
                // reset after short pulse animation
                setTimeout(()=>setJustApplied(null), 1200);
                // optional event to refresh navbar/applications
                window.dispatchEvent(new Event("applicationAdded"));
            } else {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error(data.message || "Failed to apply");
            }
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Error submitting application");
        }
    };
    // ✅ UI
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        className: "text-center mt-10 text-gray-500",
        children: "Loading jobs..."
    }, void 0, false, {
        fileName: "[project]/src/pages/jobs.js",
        lineNumber: 102,
        columnNumber: 12
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-5xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-orange-600 mb-6 text-center",
                children: "Available Jobs"
            }, void 0, false, {
                fileName: "[project]/src/pages/jobs.js",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            jobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-center text-gray-500",
                children: "No jobs available right now."
            }, void 0, false, {
                fileName: "[project]/src/pages/jobs.js",
                lineNumber: 111,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid md:grid-cols-2 gap-6",
                children: jobs.map((job)=>{
                    const alreadyApplied = appliedJobs.includes(job.id);
                    const isPulsing = justApplied === job.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: `relative border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition ${alreadyApplied ? "bg-gray-50 opacity-90" : "bg-white"}`,
                        children: [
                            alreadyApplied && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                animate: isPulsing ? {
                                    scale: [
                                        1,
                                        1.3,
                                        1
                                    ],
                                    opacity: [
                                        1,
                                        0.8,
                                        1
                                    ]
                                } : {
                                    scale: 1,
                                    opacity: 1
                                },
                                transition: {
                                    duration: 1,
                                    ease: "easeInOut"
                                },
                                className: "absolute top-3 right-3 flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/jobs.js",
                                        lineNumber: 138,
                                        columnNumber: 21
                                    }, this),
                                    " Applied"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 129,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-gray-800 mb-2",
                                children: job.service
                            }, void 0, false, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 142,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-2",
                                children: job.description
                            }, void 0, false, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: [
                                    "📍 ",
                                    job.district
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 146,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mb-4",
                                children: [
                                    "💰 Budget: $",
                                    job.budget
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 147,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.97
                                },
                                animate: justApplied === job.id ? {
                                    backgroundColor: [
                                        "#f97316",
                                        "#22c55e",
                                        "#9ca3af"
                                    ]
                                } : {},
                                transition: {
                                    duration: 1
                                },
                                onClick: ()=>handleApply(job.id),
                                disabled: alreadyApplied,
                                className: `w-full py-2 rounded-lg font-medium transition ${alreadyApplied ? "bg-gray-400 text-white cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}`,
                                children: alreadyApplied ? "Already Applied ✅" : "Apply Now"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/jobs.js",
                                lineNumber: 151,
                                columnNumber: 17
                            }, this)
                        ]
                    }, job.id, true, {
                        fileName: "[project]/src/pages/jobs.js",
                        lineNumber: 119,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/pages/jobs.js",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/jobs.js",
        lineNumber: 105,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__304745fc._.js.map