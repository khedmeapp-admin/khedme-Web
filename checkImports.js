import fs from "fs";
import path from "path";

// Base directories to scan
const scanDirs = ["src/pages", "src/components"];
// Alias mapping
const alias = "@";
const baseDir = path.resolve("src");

function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      files.push(fullPath);
    }
  });
  return files;
}

function checkImports() {
  let brokenImports = [];

  scanDirs.forEach((dir) => {
    const fullDir = path.resolve(dir);
    const files = getAllFiles(fullDir);

    files.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      const regex = /from\s+['"](@\/[^'"]+)['"]/g;
      let match;

      while ((match = regex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = path.resolve(baseDir, importPath.replace(`${alias}/`, ""));

        // Check if file exists (with .js, .jsx, or index.js fallback)
        const exists =
          fs.existsSync(resolvedPath) ||
          fs.existsSync(resolvedPath + ".js") ||
          fs.existsSync(resolvedPath + ".jsx") ||
          fs.existsSync(path.join(resolvedPath, "index.js")) ||
          fs.existsSync(path.join(resolvedPath, "index.jsx"));

        if (!exists) {
          brokenImports.push({ file, importPath, resolvedPath });
        }
      }
    });
  });

  if (brokenImports.length > 0) {
    console.log("⚠️ Broken imports found:");
    brokenImports.forEach(({ file, importPath, resolvedPath }) => {
      console.log(`File: ${file}`);
      console.log(`Import: ${importPath}`);
      console.log(`Resolved Path: ${resolvedPath}`);
      console.log("---");
    });
    process.exit(1);
  } else {
    console.log("✅ All @/ imports resolved correctly!");
  }
}

checkImports();
