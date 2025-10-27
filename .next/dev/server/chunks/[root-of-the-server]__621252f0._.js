module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/api/jobs/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/api/jobs/index.js
__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const { Pool } = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["default"];
// ✅ 1. Secure Supabase connection (works on Render, Vercel, or local)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000 // Fail fast if DB unreachable
});
// ✅ 2. Query helper
const query = (text, params)=>pool.query(text, params);
async function handler(req, res) {
    // ✅ GET — fetch all jobs
    if (req.method === "GET") {
        try {
            const { rows } = await query(`SELECT id, service, district, description, budget, status, created_at
         FROM jobs
         ORDER BY created_at DESC`);
            return res.status(200).json(rows);
        } catch (err) {
            console.error("[DB ERROR - GET]", err);
            return res.status(500).json({
                message: "Failed to fetch jobs"
            });
        }
    }
    // ✅ POST — create new job
    if (req.method === "POST") {
        const { service, district, description, budget } = req.body;
        // ✅ 3. Basic validation
        if (!service || !district || !description || budget < 10) {
            return res.status(400).json({
                message: "Missing or invalid fields"
            });
        }
        try {
            // ✅ 4. Insert job into DB
            const { rows } = await query(`INSERT INTO jobs (service, district, description, budget, status, created_at)
         VALUES ($1, $2, $3, $4, 'open', NOW())
         RETURNING id`, [
                service,
                district,
                description,
                budget
            ]);
            const jobId = rows[0]?.id;
            // ✅ 5. Log success (mock provider notification)
            console.log(`[JOB-${jobId}] New ${service} job in ${district} – $${budget}`);
            // ✅ 6. Respond success
            return res.status(201).json({
                message: "Job posted successfully",
                id: jobId
            });
        } catch (err) {
            console.error("[DB ERROR - POST]", err);
            return res.status(500).json({
                message: "Database connection failed"
            });
        }
    }
    // ✅ 7. Handle invalid methods
    return res.status(405).json({
        message: "Method not allowed"
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__621252f0._.js.map