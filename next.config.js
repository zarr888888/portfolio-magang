const basePath =
  process.env.NODE_ENV === "production" ? "/portfolio-magang" : "";
/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
