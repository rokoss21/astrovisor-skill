#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = path.join(root, "astrovisor");
const required = [
  "SKILL.md",
  "agents/openai.yaml",
  "assets/profile-template.md",
  "assets/skill.env.example",
  "references/client-setup.md",
  "references/profile-schema.md",
  "references/request-contract.md",
  "references/workflows.md",
  "scripts/astrovisor-mcp-launcher.mjs",
  "scripts/astrovisor-skill.mjs",
  "scripts/lib.mjs",
  "scripts/self-test.mjs",
];

for (const relative of required) {
  const file = path.join(skillRoot, relative);
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${relative}`);
}

const skill = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
const frontmatter = /^---\nname: astrovisor\ndescription: ([^\n]+)\n---\n/.exec(
  skill,
);
if (!frontmatter) {
  throw new Error("SKILL.md must start with name and description frontmatter");
}
if (frontmatter[1].length < 80) {
  throw new Error("Skill description is too short for reliable triggering");
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);
if (packageJson.name !== "astrovisor-skill") {
  throw new Error("Unexpected npm package name");
}
if (
  packageJson.bin?.["astrovisor-skill"] !==
  "astrovisor/scripts/astrovisor-skill.mjs"
) {
  throw new Error("astrovisor-skill binary does not target the canonical CLI");
}

for (const file of [
  "README.md",
  "astrovisor/SKILL.md",
  "astrovisor/references/client-setup.md",
]) {
  const content = fs.readFileSync(path.join(root, file), "utf8");
  if (!content.includes("https://github.com/rokoss21/astrovisor-mcp")) {
    throw new Error(`${file} must link to the AstroVisor MCP repository`);
  }
}

console.log("repository validation: ok");

