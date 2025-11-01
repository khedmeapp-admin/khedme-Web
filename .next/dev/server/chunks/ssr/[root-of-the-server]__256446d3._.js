module.exports = [
"[externals]/sonner [external] (sonner, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("sonner");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/post-job.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/post-job.js
__turbopack_context__.s([
    "default",
    ()=>PostJob
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/sonner [external] (sonner, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const SERVICE_CATEGORIES = [
    "Plumbing",
    "Electricity",
    "Painting",
    "Carpentry",
    "A/C Maintenance & Cleaning",
    "Satellite & TV Installation",
    "Internet & Wi-Fi Setup",
    "Home Deep Cleaning",
    "Appliance Repair",
    "Gardening",
    "General Maintenance"
];
function PostJob() {
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        description: "",
        service: "",
        district: "",
        budget: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!form.description || !form.service || !form.district) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__["toast"].error("Please fill all required fields", {
                style: {
                    background: "#FFE4E1",
                    color: "#E25822",
                    border: "1px solid #E25822"
                }
            });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${("TURBOPACK compile-time value", "https://khedme-api.onrender.com/api")}/jobs/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: form.description,
                    service: form.service,
                    district: form.district,
                    budget: form.budget || 0
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to create job");
            __TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__["toast"].success("✅ Job posted successfully!", {
                style: {
                    background: "#FFF2E5",
                    color: "#E25822",
                    border: "1px solid #E25822"
                }
            });
            setForm({
                description: "",
                service: "",
                district: "",
                budget: ""
            });
        } catch (err) {
            console.error("❌ Job post error:", err);
            __TURBOPACK__imported__module__$5b$externals$5d2f$sonner__$5b$external$5d$__$28$sonner$2c$__esm_import$29$__["toast"].error(err.message || "Something went wrong", {
                style: {
                    background: "#FFE4E1",
                    color: "#E25822",
                    border: "1px solid #E25822"
                }
            });
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-orange-100",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-semibold text-orange-600 mb-6",
                    children: "Post a Job"
                }, void 0, false, {
                    fileName: "[project]/pages/post-job.js",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                            name: "service",
                            value: form.service,
                            onChange: handleChange,
                            className: "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none",
                            required: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Select a service"
                                }, void 0, false, {
                                    fileName: "[project]/pages/post-job.js",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                SERVICE_CATEGORIES.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: service,
                                        children: service
                                    }, service, false, {
                                        fileName: "[project]/pages/post-job.js",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/post-job.js",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            name: "district",
                            placeholder: "District (e.g., Beirut)",
                            value: form.district,
                            onChange: handleChange,
                            className: "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/pages/post-job.js",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "number",
                            name: "budget",
                            placeholder: "Budget (e.g., 50)",
                            value: form.budget,
                            onChange: handleChange,
                            className: "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/pages/post-job.js",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                            name: "description",
                            placeholder: "Job description",
                            value: form.description,
                            onChange: handleChange,
                            className: "w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-orange-400 outline-none",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/pages/post-job.js",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50",
                            children: loading ? "Posting..." : "Post Job"
                        }, void 0, false, {
                            fileName: "[project]/pages/post-job.js",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/post-job.js",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/post-job.js",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/post-job.js",
        lineNumber: 74,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__256446d3._.js.map