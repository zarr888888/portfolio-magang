import nextVitals from "eslint-config-next/core-web-vitals";
export default [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".template-backup/**",
      "next-env.d.ts",
    ],
  },
];
