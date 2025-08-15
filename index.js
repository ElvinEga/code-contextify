const fs = require("fs").promises;
const path = require("path");
const { program } = require("commander");
const ignore = require("ignore");
const { shouldSkipTraversal, shouldSkipContent } = require("./ignore");

program
  .argument(
    "[folderPath]",
    "Path to the target folder (defaults to current directory)",
  )
  .argument("[outputName]", "Output file name (optional)")
  .option(
    "-f, --filter <patterns>",
    "Additional patterns to filter (separated by commas)",
  )
  .parse();

const folderPath = program.args[0] || ".";
const options = program.opts();
const additionalFilters = options.filter
  ? options.filter.split(",").map((p) => p.trim())
  : [];

// Create ignore instance and load .gitignore
async function loadGitignore(dir) {
  const ig = ignore();
  try {
    const gitignorePath = path.join(dir, ".gitignore");
    const gitignoreContent = await fs.readFile(gitignorePath, "utf8");
    ig.add(gitignoreContent);
    console.log("Loaded .gitignore rules");
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Warning: Could not read .gitignore:", error.message);
    }
  }
  return ig;
}

const originalSkipTraversal = shouldSkipTraversal;
const shouldSkipTraversalWithFilters = (filepath, ig) => {
  if (originalSkipTraversal(filepath)) {
    return true;
  }

  // Check additional filters
  const normalizedPath = filepath.replace(/\\/g, "/");
  const hasAdditionalFilter = additionalFilters.some((pattern) => {
    const regexPattern = pattern.includes("/")
      ? pattern.replace(/\//g, "[/\\\\]")
      : `(^|[/\\\\])${pattern}($|[/\\\\])`;

    return new RegExp(regexPattern).test(normalizedPath);
  });

  if (hasAdditionalFilter) {
    return true;
  }

  // Check .gitignore patterns
  const relativePath = path.relative(folderPath, filepath);
  if (relativePath && ig.ignores(relativePath)) {
    return true;
  }

  return false;
};

let totalFiles = 0;
let totalSize = 0;
let fileTypes = {};
let technologies = new Set();

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function generateTree(dir, prefix = "", includedFiles = new Set(), ig) {
  let result = "";
  const items = await fs.readdir(dir);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemPath = path.join(dir, item);
    const stats = await fs.stat(itemPath);

    if (shouldSkipTraversalWithFilters(itemPath, ig)) continue;

    const isLast = i === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const newPrefix = isLast ? "    " : "│   ";

    if (stats.isFile()) {
      const size = formatSize(stats.size);
      const isIncluded = !shouldSkipContent(itemPath);
      const indicator = isIncluded ? "" : " ✗";
      result += `${prefix}${connector}${item} ${indicator}\n`;
    } else {
      result += `${prefix}${connector}${item}/\n`;
      result += await generateTree(
        itemPath,
        prefix + newPrefix,
        includedFiles,
        ig,
      );
    }
  }
  return result;
}

async function getAllFiles(dir, ig) {
  const fileList = [];
  const items = await fs.readdir(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (shouldSkipTraversalWithFilters(fullPath, ig)) continue;

    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, ig);
      fileList.push(...subFiles);
    } else {
      // Track all files in stats, regardless of content inclusion
      const ext = path.extname(fullPath).toLowerCase();
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;

      if ([".ts", ".tsx"].includes(ext)) technologies.add("TypeScript");
      if ([".jsx", ".tsx"].includes(ext)) technologies.add("React");
      if (ext === ".vue") technologies.add("Vue.js");
      if (ext === ".py") technologies.add("Python");

      totalFiles++;
      totalSize += stats.size;

      if (!shouldSkipContent(fullPath)) {
        fileList.push({
          path: fullPath,
          size: stats.size,
          extension: ext,
        });
      }
    }
  }
  return fileList;
}

async function main() {
  try {
    console.log("Starting to process directory:", folderPath);

    const stats = await fs.stat(folderPath);
    if (!stats.isDirectory()) {
      throw new Error("Provided path is not a directory");
    }

    // Load .gitignore
    const ig = await loadGitignore(folderPath);

    const outputFileName = program.args[1] || `contextify-output.txt`;

    console.log("Collecting files...");
    const files = await getAllFiles(folderPath, ig);
    const includedFiles = new Set(files.map((f) => f.path));

    console.log("Generating tree structure...");
    const treeStructure = await generateTree(folderPath, "", includedFiles, ig);

    console.log(`Found ${files.length} files`);

    let output = "Project Overview\n===============\n\n";
    output += `Project Statistics:\n`;
    output += `Total Files: ${totalFiles}\n`;
    output += `Total Size: ${formatSize(totalSize)}\n\n`;

    output += "\nFolder Structure (Tree)\n=====================\n";
    output += "Legend: ✗ = Excluded from output\n\n";
    output += treeStructure;
    output += "\n==============\n";

    console.log("Processing individual files...");
    for (const file of files) {
      try {
        const content = await fs.readFile(file.path, "utf8");
        const relPath = path.relative(folderPath, file.path);

        output += `${relPath}\n`;
        output += "---------------------------------------------------------\n";
        output += content;
        output +=
          "\n---------------------------------------------------------\n";
      } catch (error) {
        console.error(`Error reading file ${file.path}:`, error.message);
      }
    }

    console.log("Writing output file...");
    await fs.writeFile(outputFileName, output);
    console.log(`Output written to ${outputFileName}`);
    console.log(`Total files processed: ${files.length}`);
    console.log(`Total size: ${formatSize(totalSize)}`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
