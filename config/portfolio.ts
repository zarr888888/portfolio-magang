// Change only after explicit approval from the CV owner.
export const publication: {
  email: string | null;
  photoApproved: boolean;
  photoSha256: string;
  cvApproved: boolean;
  cvSha256: string;
} = {
  email: null,
  // Owner explicitly approved the current photo and entire PDF in this session.
  photoApproved: true,
  photoSha256:
    "fad43dc863e54983bfb4c6e7c9fb0b1d6bd3e5b6ff3fa0bcf79af37f5c142297",
  cvApproved: true,
  cvSha256: "15bc43199fe5f023f65bc1d471e2bced1340db6bbde60a04bc66f750e062f721",
};
export const profile = {
  name: "Verlita Cahaya Putri Sulistya Ningrum",
  headline:
    "Software Engineering Student | Web Development & Quality Assurance",
  description:
    "Mahasiswa D4 Rekayasa Perangkat Lunak di Politeknik Negeri Indramayu yang memiliki minat dalam pengembangan perangkat lunak, web development, mobile development, dan software quality assurance. Berpengalaman mengerjakan proyek akademik menggunakan berbagai teknologi, serta terbiasa berkolaborasi dalam analisis, perancangan, implementasi, dan pengujian aplikasi.",
};
export const courses = [
  "Pemrograman Web",
  "Pemrograman Mobile",
  "Basis Data",
  "Desain Perangkat Lunak",
  "Pengujian dan Penjaminan Kualitas Perangkat Lunak",
  "Keamanan Perangkat Lunak",
  "Administrasi Sistem",
  "Integrasi Berkelanjutan (CI/CD)",
];
export const responsibilities = [
  "Mengelola komunikasi dan kerja sama dengan pihak eksternal untuk mendukung peningkatan kompetensi mahasiswa RPL.",
  "Membangun hubungan dengan organisasi kemahasiswaan internal Polindra lintas jurusan.",
  "Menjalin koneksi dengan Permikomnas sebagai sarana diskusi dan perluasan jaringan.",
  "Menghubungkan HIMA RPL dengan alumni untuk mendukung networking, mentoring, dan kegiatan mahasiswa.",
];
export const contributions = [
  "Mendesain UI aplikasi web menggunakan Figma, termasuk wireframe, mockup, dan prototype.",
  "Mengimplementasikan tampilan website menggunakan PHP Native, HTML, CSS, dan JavaScript.",
  "Berkolaborasi dalam analisis kebutuhan sistem serta pengembangan fitur aplikasi.",
  "Melaksanakan functional testing dengan metode black box testing.",
  "Menyusun dan menjalankan test case.",
  "Mengidentifikasi dan mendokumentasikan bug/error.",
  "Melakukan retesting dan regression testing setelah perbaikan.",
  "Menyempurnakan tampilan dan fungsionalitas berdasarkan hasil pengujian dan masukan tim.",
];
export const projectStack = [
  "PHP Native",
  "HTML",
  "CSS",
  "JavaScript",
  "MySQL",
  "Figma",
];
export const skillGroups = [
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
  },
  { title: "Mobile Development", skills: ["Flutter", "Dart"] },
  { title: "Database", skills: ["MySQL"] },
  { title: "UI Design", skills: ["Figma"] },
  {
    title: "Software Testing & QA",
    skills: [
      "Quality Assurance",
      "Black Box Testing",
      "Functional Testing",
      "Test Case Design",
      "Regression Testing",
    ],
  },
  {
    title: "Development Tools",
    skills: ["Git", "GitHub", "Visual Studio Code", "Docker", "GitHub Actions"],
  },
];
export const softSkills = [
  "Komunikasi",
  "Kerja sama tim",
  "Manajemen waktu",
  "Problem solving",
  "Tanggung jawab",
  "Adaptasi",
  "Bekerja secara mandiri",
];
export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
