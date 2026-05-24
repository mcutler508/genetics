import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

const pdfPath = path.resolve("blueprintnoname.pdf");
const buf = fs.readFileSync(pdfPath);

const parser = new PDFParse({ data: buf });
const result = await parser.getText();

const outPath = path.resolve("scripts/extracted.txt");
fs.writeFileSync(outPath, result.text, "utf8");
console.log(`Wrote ${result.text.length} chars from ${result.pages?.length ?? "?"} pages -> ${outPath}`);
