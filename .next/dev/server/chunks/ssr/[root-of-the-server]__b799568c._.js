module.exports = [
"[project]/src/components/ui/tabs.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Tabs({ defaultValue, children, className }) {
    const [value, setValue] = __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"](defaultValue);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: className,
        children: __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["Children"].map(children, (child)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["isValidElement"](child) ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["cloneElement"](child, {
                value,
                setValue
            }) : child)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
function TabsList({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `flex border-b ${className || ""}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.js",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
function TabsTrigger({ value: tabValue, value, setValue, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: ()=>setValue(tabValue),
        className: `px-4 py-2 font-medium border-b-2 transition ${value === tabValue ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-orange-600"} ${className || ""}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.js",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function TabsContent({ value: tabValue, value, children }) {
    if (value !== tabValue) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tabs.js",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/pages/provider/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ProviderDashboard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hot-toast [external] (react-hot-toast, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function ProviderDashboard() {
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [applications, setApplications] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("available");
    const [appliedJobIds, setAppliedJobIds] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const provider = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    /* ---------------------------------------------------
     🟢 Fetch all jobs
  --------------------------------------------------- */ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetch(`${("TURBOPACK compile-time value", "https://khedme-api.onrender.com")}/api/jobs/all`).then((res)=>res.json()).then((data)=>{
            if (data.success) setJobs(data.jobs);
        }).catch((err)=>console.error("Error fetching jobs:", err));
    }, []);
    /* ---------------------------------------------------
     🟠 Fetch provider’s applications
  --------------------------------------------------- */ const fetchApplications = ()=>{
        if (!provider?.id) return;
        fetch(`${("TURBOPACK compile-time value", "https://khedme-api.onrender.com")}/api/providers/applications/${provider.id}`).then((res)=>res.json()).then((data)=>{
            if (data.success) {
                setApplications(data.applications);
                setAppliedJobIds(data.applications.map((a)=>a.job_id)); // 🔒 Track applied jobs
            }
        }).catch((err)=>console.error("Error fetching applications:", err));
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchApplications();
        const interval = setInterval(fetchApplications, 10000);
        return ()=>clearInterval(interval);
    }, [
        provider
    ]);
    /* ---------------------------------------------------
     🟣 Apply to a job
  --------------------------------------------------- */ const handleApply = async (jobId)=>{
        if (!provider?.id) return __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Provider not found — please log in again");
        if (appliedJobIds.includes(jobId)) return __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("You already applied for this job");
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://khedme-api.onrender.com")}/api/providers/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_id: jobId,
                    provider_id: provider.id,
                    message: "I would like to apply for this job."
                })
            });
            const data = await res.json();
            if (data.success) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].success("Application submitted successfully ✅");
                setAppliedJobIds((prev)=>[
                        ...prev,
                        jobId
                    ]); // disable button
                setActiveTab("applications");
                fetchApplications();
            } else {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error(data.message || "Failed to apply");
            }
        } catch (err) {
            console.error("Error applying for job:", err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hot$2d$toast__$5b$external$5d$__$28$react$2d$hot$2d$toast$2c$__esm_import$29$__["default"].error("Server error while applying");
        }
    };
    /* ---------------------------------------------------
     🧱 UI Layout
  --------------------------------------------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-orange-50 to-white px-6 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-orange-600 mb-6 text-center",
                    children: "Provider Dashboard"
                }, void 0, false, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Tabs"], {
                    value: activeTab,
                    onValueChange: setActiveTab,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TabsList"], {
                            className: "bg-white shadow-sm rounded-xl mb-6 p-1 flex justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "available",
                                    children: "Available Jobs"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "applications",
                                    children: "My Applications"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/provider/index.js",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TabsContent"], {
                            value: "available",
                            children: jobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-500 mt-10",
                                children: "No jobs available yet."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/provider/index.js",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 mt-6",
                                children: jobs.map((job)=>{
                                    const alreadyApplied = appliedJobIds.includes(job.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-orange-600",
                                                children: job.service
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 115,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-sm",
                                                children: [
                                                    "District: ",
                                                    job.district
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 118,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-gray-600",
                                                children: job.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 119,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-orange-500 font-semibold mt-1",
                                                children: [
                                                    "$",
                                                    job.budget
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 120,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>handleApply(job.id),
                                                disabled: alreadyApplied,
                                                className: `w-full mt-4 text-white rounded-lg ${alreadyApplied ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`,
                                                children: alreadyApplied ? "Already Applied" : "Apply Now"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 123,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, job.id, true, {
                                        fileName: "[project]/src/pages/provider/index.js",
                                        lineNumber: 111,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/provider/index.js",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["TabsContent"], {
                            value: "applications",
                            children: applications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-500 mt-10",
                                children: "You haven’t applied for any jobs yet."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/provider/index.js",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 mt-6",
                                children: applications.map((app)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                        className: "text-lg font-semibold text-orange-600",
                                                        children: app.service
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/provider/index.js",
                                                        lineNumber: 155,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `px-3 py-1 text-sm font-medium rounded-full ${app.status === "approved" ? "bg-green-100 text-green-700" : app.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`,
                                                        children: app.status === "approved" ? "✅ Approved" : app.status === "rejected" ? "❌ Rejected" : "⏳ Pending"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/provider/index.js",
                                                        lineNumber: 158,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 154,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-sm mt-1",
                                                children: [
                                                    "District: ",
                                                    app.district
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 175,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-gray-600",
                                                children: app.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-orange-500 font-semibold mt-1",
                                                children: [
                                                    "$",
                                                    app.budget
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this),
                                            app.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-gray-500 text-sm italic",
                                                children: [
                                                    "“",
                                                    app.message,
                                                    "”"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/provider/index.js",
                                                lineNumber: 183,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, app.application_id, true, {
                                        fileName: "[project]/src/pages/provider/index.js",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/provider/index.js",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/provider/index.js",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/provider/index.js",
                    lineNumber: 96,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/provider/index.js",
            lineNumber: 91,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/provider/index.js",
        lineNumber: 90,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__b799568c._.js.map