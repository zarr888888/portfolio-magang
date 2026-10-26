"use client";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
const links = [
  ["home", "Home"],
  ["about", "About"],
  ["education", "Education"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <header className="site-header">
      <div className="shell nav-bar">
        <a
          href="#home"
          className="brand"
          aria-label="Verlita, kembali ke beranda"
        >
          v<span>.</span>
          <span className="brand-label">VERLITA</span>
        </a>
        <nav
          aria-label="Navigasi utama"
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            aria-label="Ganti tema terang atau gelap"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="sun-icon" size={19} />
            <Moon className="moon-icon" size={19} />
          </button>
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
