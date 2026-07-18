#!/usr/bin/env node
/**
 * Stage 2 — CLI-based AI tool (e.g. Claude Code CLI / Gemini CLI)
 *
 * Reads the structured JSON spec produced by the Stage 1 chat AI and turns it
 * into scaffolding a developer (or an IDE-based AI in Stage 3) can build on:
 *   - a Markdown feature-spec document
 *   - a code stub with TODOs derived from each acceptance criterion
 *   - a matching test stub with one failing placeholder per criterion
 *
 * Usage: node generate-stub.js [path-to-spec.json] [output-dir]
 */

const fs = require("fs");
const path = require("path");

const specPath = path.resolve(
  __dirname,
  process.argv[2] || "../stage1-chat/feature-spec.json"
);
const outDir = path.resolve(__dirname, process.argv[3] || "./output");

const REQUIRED_FIELDS = [
  "feature_name",
  "description",
  "user_story",
  "acceptance_criteria",
  "priority",
];

function loadSpec(specPath) {
  if (!fs.existsSync(specPath)) {
    throw new Error(`Spec file not found: ${specPath}`);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const missing = REQUIRED_FIELDS.filter((field) => !(field in spec));
  if (missing.length > 0) {
    throw new Error(`Spec is missing required field(s): ${missing.join(", ")}`);
  }
  if (!Array.isArray(spec.acceptance_criteria) || spec.acceptance_criteria.length === 0) {
    throw new Error("acceptance_criteria must be a non-empty array");
  }
  return spec;
}

function toKebabCase(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toCamelCase(text) {
  const words = text.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return words
    .map((word, i) =>
      i === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

function renderMarkdown(spec) {
  const criteria = spec.acceptance_criteria.map((c) => `- [ ] ${c}`).join("\n");
  return `# ${spec.feature_name}

**Priority:** ${spec.priority}

## Description

${spec.description}

## User Story

${spec.user_story}

## Acceptance Criteria

${criteria}

---
_Generated automatically by Stage 2 (\`generate-stub.js\`) from the Stage 1 chat-AI spec._
`;
}

function renderCodeStub(spec, functionName) {
  const todos = spec.acceptance_criteria
    .map((c, i) => ` * ${i + 1}. TODO: ${c}`)
    .join("\n");
  return `/**
 * ${spec.feature_name}
 *
 * ${spec.description}
 *
 * Acceptance criteria to satisfy:
${todos}
 *
 * NOTE: generated as a stub by Stage 2 (CLI). Stage 3 (IDE AI) fills in the
 * implementation below.
 */
function ${functionName}(tasks, now = new Date()) {
  // TODO: implement — see acceptance criteria above.
  throw new Error("Not implemented yet");
}

module.exports = { ${functionName} };
`;
}

function renderTestStub(spec, functionName) {
  const cases = spec.acceptance_criteria
    .map(
      (c, i) => `// TODO (criterion ${i + 1}): ${c}
// test(() => { /* ... */ });`
    )
    .join("\n\n");
  return `// Test stub for ${spec.feature_name}, generated from acceptance criteria.
// Stage 3 (IDE AI) replaces these placeholders with real assertions.
const { ${functionName} } = require("./${functionName}");

${cases}
`;
}

function main() {
  console.log(`[stage2-cli] Reading spec from ${specPath}`);
  const spec = loadSpec(specPath);
  console.log(`[stage2-cli] Spec valid ✔ (${spec.acceptance_criteria.length} acceptance criteria)`);

  const slug = toKebabCase(spec.feature_name);
  const functionName = "get" + toCamelCase(spec.feature_name).replace(/^./, (c) => c.toUpperCase());

  fs.mkdirSync(outDir, { recursive: true });

  const mdPath = path.join(outDir, `${slug}.md`);
  const jsPath = path.join(outDir, `${functionName}.js`);
  const testPath = path.join(outDir, `${functionName}.test.js`);

  fs.writeFileSync(mdPath, renderMarkdown(spec));
  fs.writeFileSync(jsPath, renderCodeStub(spec, functionName));
  fs.writeFileSync(testPath, renderTestStub(spec, functionName));

  console.log(`[stage2-cli] Wrote feature spec  -> ${path.relative(process.cwd(), mdPath)}`);
  console.log(`[stage2-cli] Wrote code stub     -> ${path.relative(process.cwd(), jsPath)}`);
  console.log(`[stage2-cli] Wrote test stub     -> ${path.relative(process.cwd(), testPath)}`);
  console.log(`[stage2-cli] Done. Hand these files to Stage 3 (IDE AI) for implementation.`);
}

main();
