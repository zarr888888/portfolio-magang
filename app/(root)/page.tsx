import { Navigation } from "@/components/portfolio/navigation";
import {
  assetPath,
  contributions,
  courses,
  profile,
  projectStack,
  publication,
  responsibilities,
  skillGroups,
  softSkills,
} from "@/config/portfolio";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CheckCheck,
  Code2,
  Download,
  GraduationCap,
  Mail,
  Users,
  Waves,
} from "lucide-react";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  const photoAvailable =
    publication.photoApproved &&
    existsSync(path.join(process.cwd(), "public/images/foto-profil.jpg"));
  const cvAvailable =
    publication.cvApproved &&
    existsSync(path.join(process.cwd(), "public/cv/cv-verlita.pdf"));
  const screenshotAvailable = existsSync(
    path.join(process.cwd(), "public/images/aquara.webp")
  );
  return (
    <>
      <a className="skip-link" href="#main">
        Lewati navigasi
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="shell hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow availability">
              <span /> PERSIAPAN MAGANG SEMESTER 6
            </span>
            <p className="intro">Halo, saya Verlita.</p>
            <h1 id="hero-title">
              Verlita Cahaya Putri <span>Sulistya Ningrum.</span>
            </h1>
            <p className="headline">{profile.headline}</p>
            <p className="hero-description">{profile.description}</p>
            <div className="button-row">
              <a className="button primary" href="#projects">
                Lihat Proyek <ArrowUpRight size={18} />
              </a>
              {publication.email && (
                <a
                  className="button secondary"
                  href={`mailto:${publication.email}`}
                >
                  Hubungi Saya <Mail size={18} />
                </a>
              )}
              {cvAvailable && (
                <a
                  className="button secondary"
                  href={assetPath("/cv/cv-verlita.pdf")}
                  download
                >
                  Download CV <Download size={18} />
                </a>
              )}
            </div>
            <div className="hero-meta">
              <GraduationCap size={20} />
              <span>
                D4 Rekayasa Perangkat Lunak
                <br />
                <strong>Politeknik Negeri Indramayu</strong>
              </span>
            </div>
          </div>
          <div className="portrait-area">
            <div className="portrait-frame">
              {photoAvailable ? (
                <Image
                  src={assetPath("/images/foto-profil.jpg")}
                  alt={`Foto profil ${profile.name}`}
                  fill
                  sizes="(max-width: 760px) 85vw, 400px"
                  priority
                  className="portrait-image"
                />
              ) : (
                <div
                  className="portrait-placeholder"
                  role="img"
                  aria-label="Placeholder netral foto profil Verlita"
                >
                  <span>VC</span>
                  <p>Verlita Cahaya</p>
                  <small>SOFTWARE ENGINEERING STUDENT</small>
                </div>
              )}
            </div>
            <div className="portrait-note">
              <Code2 size={24} />
              <div>
                Belajar. Berkolaborasi.
                <br />
                <strong>Membangun solusi.</strong>
              </div>
            </div>
            <span className="portrait-caption">
              WEB DEVELOPMENT & SOFTWARE QUALITY
            </span>
          </div>
        </section>
        <div className="shell focus-strip">
          <span>FOKUS SAYA</span>
          <p>
            <Code2 size={18} /> Web Development
          </p>
          <p>
            <BookOpen size={18} /> UI Design
          </p>
          <p>
            <CheckCheck size={18} /> Software Quality Assurance
          </p>
          <a href="#about" aria-label="Baca tentang saya">
            <ArrowDown size={20} />
          </a>
        </div>
        <section
          id="about"
          className="shell section two-column"
          aria-labelledby="about-title"
        >
          <div>
            <p className="eyebrow">01 / ABOUT ME</p>
            <h2 id="about-title">
              Mengenal saya
              <br />
              <span>lebih dekat.</span>
            </h2>
          </div>
          <div className="body-copy">
            <p>
              Saya mahasiswa D4 Rekayasa Perangkat Lunak di Politeknik Negeri
              Indramayu dengan ketertarikan pada pengembangan aplikasi web dan
              mobile.
            </p>
            <p>
              Melalui proyek akademik, saya belajar membangun aplikasi
              menggunakan Flutter, Laravel, PHP, dan MySQL. Saya terbiasa
              bekerja secara mandiri maupun bersama tim, mulai dari analisis
              kebutuhan dan desain antarmuka hingga implementasi, pengujian
              fungsional, dan perbaikan aplikasi.
            </p>
            <p>
              Di luar perkuliahan, saya aktif dalam organisasi kemahasiswaan
              untuk mengembangkan komunikasi, kolaborasi, dan manajemen waktu.
            </p>
            <div className="small-note">
              Mahasiswa semester 5 · Persiapan magang semester 6
            </div>
          </div>
        </section>
        <section
          id="education"
          className="tinted section"
          aria-labelledby="education-title"
        >
          <div className="shell">
            <p className="eyebrow">02 / EDUCATION</p>
            <h2 id="education-title">
              Fondasi untuk <span>terus berkembang.</span>
            </h2>
            <article className="card education-card">
              <div className="education-heading">
                <span className="section-icon">
                  <GraduationCap size={28} />
                </span>
                <div>
                  <h3>Politeknik Negeri Indramayu</h3>
                  <p>D4 Rekayasa Perangkat Lunak</p>
                </div>
                <span className="date-tag">2024 – Sekarang</span>
              </div>
              <h4>Mata kuliah relevan</h4>
              <ul className="course-grid">
                {courses.map((course) => (
                  <li key={course}>
                    <span />
                    {course}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section
          id="experience"
          className="shell section"
          aria-labelledby="experience-title"
        >
          <p className="eyebrow">03 / ORGANIZATION EXPERIENCE</p>
          <h2 id="experience-title">
            Bertumbuh melalui <span>kolaborasi.</span>
          </h2>
          <div className="experience-layout">
            <div className="experience-date">
              <span className="timeline-dot" />
              <strong>2025 – 2026</strong>
              <p>Pengalaman organisasi</p>
            </div>
            <article className="card">
              <span className="section-icon">
                <Users size={25} />
              </span>
              <h3>Sekretaris Subdivisi Hubungan Eksternal</h3>
              <p className="organization">
                HIMA Rekayasa Perangkat Lunak
                <br />
                Politeknik Negeri Indramayu
              </p>
              <ul className="bullet-list">
                {responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section
          id="projects"
          className="tinted section"
          aria-labelledby="projects-title"
        >
          <div className="shell">
            <p className="eyebrow">04 / FEATURED PROJECT</p>
            <h2 id="projects-title">
              Dari ide menjadi <span>pengalaman nyata.</span>
            </h2>
            <p className="section-description">
              Proyek akademik yang mempertemukan desain, pengembangan, dan
              pengujian perangkat lunak.
            </p>
            <article className="card project-card">
              <div className="project-art">
                {screenshotAvailable ? (
                  <Image
                    src={assetPath("/images/aquara.webp")}
                    alt="Screenshot aplikasi AQUARA"
                    width={1000}
                    height={700}
                    sizes="(max-width: 760px) 90vw, 500px"
                  />
                ) : (
                  <div className="aquara-illustration">
                    <Waves size={64} strokeWidth={1.4} />
                    <span>AQUARA</span>
                    <p>
                      Edukasi & komunitas
                      <br />
                      perikanan air tawar
                    </p>
                    <small>ILUSTRASI PROYEK · BUKAN SCREENSHOT APLIKASI</small>
                  </div>
                )}
              </div>
              <div className="project-copy">
                <div className="project-labels">
                  <span className="badge">Academic Team Project</span>
                  <span>2025 – 2026</span>
                </div>
                <h3>AQUARA</h3>
                <p className="project-subtitle">
                  Platform Edukasi dan Komunitas Perikanan Air Tawar
                </p>
                <p>
                  Platform edukasi dan komunitas yang berfokus pada perikanan
                  air tawar, dikembangkan dalam Project 1 & 2.
                </p>
                <Chips items={projectStack} />
                <p className="project-role">
                  Kontribusi: UI Design · Web Development · Software Testing
                </p>
              </div>
              <details className="project-details">
                <summary>
                  Lihat kontribusi & proses pengerjaan{" "}
                  <span aria-hidden="true">＋</span>
                </summary>
                <ol>
                  {contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </details>
            </article>
          </div>
        </section>
        <section
          id="skills"
          className="shell section"
          aria-labelledby="skills-title"
        >
          <p className="eyebrow">05 / SKILLS</p>
          <h2 id="skills-title">
            Keterampilan yang <span>saya kembangkan.</span>
          </h2>
          <p className="section-description">
            Teknologi dan praktik yang saya gunakan dalam pembelajaran dan
            proyek akademik.
          </p>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="card skill-card" key={group.title}>
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <Chips items={group.skills} />
              </article>
            ))}
          </div>
          <div className="soft-skills">
            <h3>Lebih dari keterampilan teknis.</h3>
            <p>Cara saya bekerja, belajar, dan berkolaborasi.</p>
            <Chips items={softSkills} />
          </div>
        </section>
        <section
          id="contact"
          className="shell contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-card">
            <p className="eyebrow">06 / CONTACT</p>
            <h2 id="contact-title">
              Mari bertumbuh
              <br />
              dan <span>berkontribusi.</span>
            </h2>
            <p>
              Saya mempersiapkan magang semester 6 untuk menerapkan pembelajaran
              dalam pengembangan web dan software quality assurance.
            </p>
            {publication.email ? (
              <a
                className="button primary"
                href={`mailto:${publication.email}`}
              >
                Hubungi Saya <Mail size={18} />
              </a>
            ) : (
              <p className="contact-notice">
                Informasi kontak publik belum tersedia.
              </p>
            )}
            {cvAvailable && (
              <a
                className="text-link"
                href={assetPath("/cv/cv-verlita.pdf")}
                download
              >
                Download CV <Download size={16} />
              </a>
            )}
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#home">Kembali ke atas ↑</a>
      </footer>
    </>
  );
}
