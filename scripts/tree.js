// scripts/tree.js
import dirTree from "directory-tree";
import treeify from "treeify";
import process from "process";
import fs from "fs";

const HIDDEN_FILES = new Set([
        "package-lock.json",
        "eslint.config.js",
        "README.md",
        "vite.config.js",   // build boilerplate, not relevant
]);

const HIDDEN_DIRS = new Set([
        "scripts",
        "public",           // static assets, not part of the code structure
]);

const OPAQUE_DIRS = new Set([
        // directories to show collapsed (without expanding their contents)
        // "public",
]);

function simplify(node) {
        const isDir = Array.isArray(node.children);

        if (!isDir) {
                // It's a file
                return HIDDEN_FILES.has(node.name) ? null : {};
        }

        // It's a directory
        if (HIDDEN_DIRS.has(node.name)) return null;
        if (OPAQUE_DIRS.has(node.name)) return {};

        const obj = {};
        for (const child of node.children) {
                const result = simplify(child);
                if (result !== null) {
                        obj[child.name] = result;
                }
        }

        return Object.keys(obj).length > 0 ? obj : null;
}

const raw = dirTree("./", {
        exclude: /node_modules|\.git|dist|\.vite|\.DS_Store|\.eslintcache/,
        extensions: /\.(js|jsx|ts|tsx|json|md|css)$/,
});

// Process root's children directly, bypassing the root node itself
const simplified = {};
for (const child of raw.children ?? []) {
        const result = simplify(child);
        if (result !== null) {
                simplified[child.name] = result;
        }
}

const tree = treeify.asTree(simplified, false);

// Inject tree into README.md between markers
const README_PATH = "./README.md";
const MARKER_START = "<!-- TREE_START -->";
const MARKER_END = "<!-- TREE_END -->";

const readme = fs.readFileSync(README_PATH, "utf-8");

if (!readme.includes(MARKER_START) || !readme.includes(MARKER_END)) {
        console.error(`Markers not found in README.md`);
        process.exit(1);
}

const updated = readme.replace(
        /<!-- TREE_START -->[\s\S]*?<!-- TREE_END -->/,
        `<!-- TREE_START -->\n\`\`\`\n${tree}\`\`\`\n<!-- TREE_END -->`
);

fs.writeFileSync(README_PATH, updated, "utf-8");
console.log("README.md updated successfully.");
