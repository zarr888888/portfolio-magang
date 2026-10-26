import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

// Read the same approval configuration used by the page (Node 22 compatible).
const source = fs.readFileSync("config/portfolio.ts", "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const { publication } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);
const approvedAssets = new Map();
if (publication.photoApproved)
  approvedAssets.set("images/foto-profil.jpg", publication.photoSha256);
if (publication.cvApproved)
  approvedAssets.set("cv/cv-verlita.pdf", publication.cvSha256);

const root = path.resolve("out");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(html, /Verlita Cahaya Putri/);
assert.match(html, /lang="id"/);
assert.doesNotMatch(
  html,
  /Naman|Barkiya|Alfajar|convot|googletagmanager|href="tel:/i
);
for (const id of [
  "home",
  "about",
  "education",
  "experience",
  "projects",
  "skills",
  "contact",
]) {
  assert.ok(html.includes(`id="${id}"`), `Missing section ${id}`);
  assert.ok(html.includes(`href="#${id}"`), `Missing navigation ${id}`);
}
for (const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  const url = match[1].split("?")[0];
  assert.ok(url.startsWith("/portfolio-magang/"), `Missing basePath: ${url}`);
  const local = path.join(
    root,
    decodeURIComponent(url.slice("/portfolio-magang/".length))
  );
  assert.ok(fs.existsSync(local), `Missing asset: ${url}`);
}
assert.ok(fs.existsSync(path.join(root, ".nojekyll")));
assert.ok(!fs.existsSync(path.join(root, "api")));
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)]
    );
}
const files = walk(root);
const relative = (file) => path.relative(root, file).split(path.sep).join("/");
const hash = (file) =>
  createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const publicFiles = walk(path.resolve("public"));
const allowedPublic = new Set([
  ".nojekyll",
  "icon.svg",
  ...approvedAssets.keys(),
]);
for (const file of publicFiles) {
  const name = path
    .relative(path.resolve("public"), file)
    .split(path.sep)
    .join("/");
  assert.ok(allowedPublic.has(name), `Public asset has no approval: ${name}`);
}
for (const [name, approvedHash] of approvedAssets) {
  assert.match(
    approvedHash,
    /^[a-f0-9]{64}$/,
    `Missing approved hash: ${name}`
  );
  assert.equal(
    hash(path.join("public", name)),
    approvedHash,
    `Source changed since approval: ${name}`
  );
  assert.equal(
    hash(path.join(root, name)),
    approvedHash,
    `Export differs from approved file: ${name}`
  );
}
for (const file of files) {
  const name = relative(file);
  assert.doesNotMatch(
    name,
    /(?:private-assets|\.template-backup|\.env|unapproved|unconfirmed)/i,
    `Private file exported: ${name}`
  );
  if (
    /\.(?:pdf|docx?|xlsx?|pptx?|zip|7z|pem|key|jpe?g|png|webp)$/i.test(name)
  ) {
    assert.ok(approvedAssets.has(name), `Unapproved document/image: ${name}`);
  }
}
const photoUrl = "/portfolio-magang/images/foto-profil.jpg";
const cvUrl = "/portfolio-magang/cv/cv-verlita.pdf";
assert.equal(
  html.includes(`src="${photoUrl}"`),
  publication.photoApproved,
  "Photo rendering does not match approval"
);
const downloadLinks = [...html.matchAll(/<a\b[^>]*>/g)].filter(([tag]) =>
  tag.includes(`href="${cvUrl}"`)
);
assert.equal(
  downloadLinks.length,
  publication.cvApproved ? 2 : 0,
  "CV links do not match approval"
);
assert.ok(
  downloadLinks.every(([tag]) => /\bdownload(?:=|\s|>)/.test(tag)),
  "CV link lacks download attribute"
);
if (publication.cvApproved)
  assert.equal(
    fs
      .readFileSync(path.join(root, "cv/cv-verlita.pdf"))
      .subarray(0, 5)
      .toString(),
    "%PDF-",
    "Invalid PDF signature"
  );
for (const [, email] of html.matchAll(/href="mailto:([^"?]+)[^"]*"/g)) {
  assert.equal(email, publication.email, "Unapproved email contact");
}
if (!publication.email) assert.doesNotMatch(html, /mailto:/i);
for (const file of files.filter((file) => /\.(html|js|txt|json)$/.test(file))) {
  const text = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(
    text,
    /Naman Barkiya|Alfajar Islami Akbar|convot\.xyz/i,
    `Unexpected identity or private data in ${file}`
  );
  if (publication.email !== "2405032@student.polindra.ac.id") {
    assert.doesNotMatch(
      text,
      /2405032@student\.polindra\.ac\.id/i,
      `Unapproved email in ${file}`
    );
  }
}
console.log(
  `PASS: ${files.length} export files; identity, navigation, basePath, assets, privacy and static-only routes verified.`
);
