"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import ThemeToggleButton from "./ThemeToggleButton";
import Image from "next/image";
import {
  FaJs, FaReact, FaAngular, FaNodeJs, FaSass, FaGitAlt, FaGithub,
  FaDatabase, FaJava
} from "react-icons/fa";
import {
  SiTypescript, SiRedux, SiNextdotjs, SiExpress, SiTailwindcss,
  SiMongodb, SiMysql, SiPostman, SiCypress, SiNetlify, SiGnubash
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

const skillIconMap: { [key: string]: React.ElementType } = {
  JavaScript: FaJs, TypeScript: SiTypescript, Angular: FaAngular, React: FaReact,
  Redux: SiRedux, "Node.js": FaNodeJs, "Next.js": SiNextdotjs, "Express.js": SiExpress,
  Java: FaJava, HTML5: FaReact, CSS3: FaSass, "SCSS/SASS": FaSass, "Tailwind CSS": SiTailwindcss,
  Jasmine: SiCypress, Karma: SiCypress, Cypress: SiCypress, "React Testing Library": FaReact,
  "REST APIs": SiGnubash, MongoDB: SiMongodb, MySQL: SiMysql, Postman: SiPostman,
  Git: FaGitAlt, "GitHub Actions": FaGithub, Netlify: SiNetlify,
};

const files = [
  { id: "about", label: "About", icon: "◆", color: "text-teal" },
  { id: "experience", label: "Experience", icon: "◆", color: "text-amber" },
  { id: "projects", label: "Projects", icon: "▸", color: "text-muted" },
  { id: "skills", label: "Skills", icon: "{ }", color: "text-teal" },
  { id: "education", label: "Education", icon: "◆", color: "text-amber" },
  { id: "contact", label: "Contact", icon: "$", color: "text-teal" },
];

const experience = [
  {
    role: "Senior Software Engineer",
    range: "Jan 2024 — Present",
    tech: "Angular 17, RxJS, NgRx, TypeScript, Node.js, Express, MongoDB, Micro Frontends",
    bullets: [
      "Led frontend development for a large-scale enterprise platform using a micro-frontend architecture.",
      "Architected and implemented state management with NgRx, improving data consistency and reducing bugs by 30%.",
      "Mentored junior developers, conducted code reviews, and established best practices for the team.",
    ],
  },
  {
    role: "Software Engineer",
    range: "Jul 2021 — Dec 2023",
    tech: "Angular 12, React, TypeScript, Node.js, REST APIs, Jasmine, Karma",
    bullets: [
      "Developed and maintained features for a customer-facing web application, resulting in a 20% increase in user engagement.",
      "Collaborated with UX/UI designers to create responsive and accessible user interfaces.",
      "Wrote unit and integration tests, achieving 85% code coverage and improving application stability.",
    ],
  },
];

const projects = [
  {
    name: "Project Camp",
    sub: "Role-Based Project Management System · Jun 2026 — In Progress",
    tech: "Angular 21, Signals, RxJS, Standalone Components, Node.js, Express.js, MongoDB, JWT, Angular Universal (SSR/SSG)",
    image: "https://via.placeholder.com/800x600/161B22/E6E8EB?text=Project+Camp",
    bullets: [
      "Full-stack MEAN app with role-based access for Admin, Manager, and Member.",
      "UI built with Standalone Components, Signals, and the new Control Flow syntax (@if/@for/@switch).",
      "Secure JWT authentication with route guards and HTTP interceptors.",
    ],
  },
  {
    name: "Skill Studio",
    sub: "Learning Management System · Mar 2026 — May 2026",
    tech: "React, TypeScript, Vite, Redux Toolkit, Tailwind CSS, Node.js, MongoDB",
    image: "https://via.placeholder.com/800x600/161B22/E6E8EB?text=Skill+Studio",
    bullets: [
      "Dynamic, responsive UX built with React and Redux Toolkit.",
      "Modular, reusable components to speed up new feature integration.",
      "RESTful API backend with Node.js and Express for managing courses, users, and progress.",
    ],
  },
];

const skills: Record<string, string[]> = {
  "Languages & Frameworks": [
    "JavaScript", "TypeScript", "Java", "Angular", "React", "Redux", "RxJS",
    "Node.js", "Next.js", "Express.js", "NgRx",
  ],
  "Styling & UI": ["HTML5", "CSS3", "SCSS/SASS", "Tailwind CSS", "Angular Material", "Responsive Design"],
  "Testing & Quality": ["Jasmine", "Karma", "Cypress", "React Testing Library", "ESLint", "SonarQube"],
  "Databases & Tools": ["MongoDB", "MySQL", "Postman", "REST APIs", "Microservices", "JWT Auth"],
  "DevOps & Platforms": ["Git", "GitHub Actions", "CI/CD", "GCP", "Netlify", "Agile/Scrum", "WCAG/ARIA"],
};

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Ayushi1516",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ayushi-solanki-/", // Please replace with your actual LinkedIn URL
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [active, setActive] = useState("about");
  const [navOpen, setNavOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Highlights when section is in the middle 30% of the viewport
    );

    files.forEach((file) => {
      if (file.id === 'blog') return;
      const el = document.getElementById(file.id);
      if (el) {
        sectionRefs.current[file.id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setNavOpen(false);
    if (id === 'blog') {
      // External navigation, handled by Link component
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-surface border-b border-border px-4 py-3">
        <span className="font-mono text-sm text-teal">ayushi-rathore/</span>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="font-mono text-xs text-ink border border-border rounded px-2 py-1"
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            {navOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar / file explorer */}
      <aside
        className={`fixed md:sticky top-0 z-20 h-screen w-64 md:w-72 bg-surface border-r border-border p-6 flex-col
          ${navOpen ? "flex" : "hidden md:flex"}
          transition-transform md:translate-x-0`}
      >
        <div className="hidden md:block mb-8">
          <p className="font-mono text-xs text-muted tracking-wide">EXPLORER</p>
          <div className="flex items-center gap-2 mt-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-muted">
              <path d="M19.5 21a2.5 2.5 0 002.5-2.5V9.31a2.5 2.5 0 00-.733-1.768l-4.11-4.11A2.5 2.5 0 0015.393 2H5.5A2.5 2.5 0 003 4.5v14A2.5 2.5 0 005.5 21H19.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M15 2v3.5a1.5 1.5 0 001.5 1.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <p className="font-mono text-sm text-teal">ayushi-rathore</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {files.map((f) => (
            f.id === 'blog' ? (
              <Link key={f.id} href="/blog" className="group flex items-center gap-2 font-mono text-sm px-2 py-1.5 rounded text-left transition-colors w-full relative">
                <div className={`absolute left-0 h-full w-1 rounded-r-lg bg-teal transition-all duration-300 opacity-0`} />
                <span className={`w-4 text-center text-xs transition-colors text-muted group-hover:text-ink`}>{f.icon}</span>
                <span className={`transition-colors text-muted group-hover:text-ink`}>
                  {f.label}
                </span>
              </Link>
            ) : (
              <button
                key={f.id}
                onClick={() => go(f.id)}
                className="group flex items-center gap-2 font-mono text-sm px-2 py-1.5 rounded text-left transition-colors w-full relative"
              >
                <div className={`absolute left-0 h-full w-1 rounded-r-lg bg-teal transition-all duration-300 ${active === f.id ? 'opacity-100' : 'opacity-0'}`} />
                <span className={`w-4 text-center text-xs transition-colors ${active === f.id ? f.color : 'text-muted group-hover:text-ink'}`}>{f.icon}</span>
                <span className={`transition-colors ${active === f.id ? 'text-ink' : 'text-muted group-hover:text-ink'}`}>
                  {f.label}
                </span>
              </button>
            )
          ))}
        </nav>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={containerVariants}
          className="mt-auto pt-6 border-t border-border font-mono text-xs text-muted leading-relaxed">
          <p className="text-ink mb-4">// find me on</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-teal transition-colors"
                aria-label={link.name}
                variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
            <div className="hidden md:block">
              <ThemeToggleButton />
            </div>
          </div>
        </motion.div>
      </aside>

      {/* Main editor pane */}
      <main className="flex-1 min-w-0 scrollbar-thin scrollbar-thumb-surface2">
        {/* ABOUT */}
        <section id="about" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-mono text-lg text-amber mb-4">About</h2>
            <h1 className="font-display text-4xl md:text-6xl font-medium leading-[1.05] text-ink">
              Ayushi Rathore
            </h1>
            <AnimatePresence>
              <motion.p
                key="role"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-display italic text-xl md:text-2xl text-teal mt-3"
              >
                Full Stack Developer
              </motion.p>
            </AnimatePresence>
            <p className="font-body text-muted mt-6 leading-relaxed max-w-xl">
              5+ years designing, building, and shipping scalable web applications
              with Angular (10 → 21), React, Node.js, Express, and MongoDB. I care
              about clean frontend architecture, measurable performance wins, and
              leaving code better than I found it — currently sitting around 80%
              unit test coverage and a 40% load-time cut on my last migration.
            </p>
            <p className="font-mono text-xs text-muted mt-6">
              <span className="text-teal">const</span> status ={" "}
              <span className="text-amber">&quot;immediate joiner, open to remote, willing to relocate&quot;</span>;
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:ayushisolanki555@gmail.com"
                className="font-mono text-xs bg-amber text-bg px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                Email me
              </a>
              <button
                onClick={() => go("experience")}
                className="font-mono text-xs border border-border text-ink px-4 py-2 rounded hover:border-teal transition-colors"
              >
                View experience →
              </button>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl border-t border-border">
          <h2 className="font-mono text-lg text-amber mb-8">Experience</h2>
          <div className="flex flex-col gap-12">
            {experience.map((job) => (
              <motion.div key={job.role} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                <div className="relative pl-6 border-l border-border">
                  <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-teal" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="font-display text-2xl text-ink">{job.role}</h2>
                    <span className="font-mono text-xs text-muted">{job.range}</span>
                  </div>
                  <p className="font-mono text-xs text-teal mt-1">{job.tech}</p>
                  <ul className="mt-4 space-y-2">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                        <span className="text-amber">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl border-t border-border">
          <h2 className="font-mono text-lg text-amber mb-8">Projects</h2>
          <div className="flex flex-col gap-10">
            {projects.map((p) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
                <div className="bg-surface border border-border rounded-lg p-6 transition-all hover:shadow-lg hover:border-teal/50">
                  <div className="relative w-full h-40 rounded-md overflow-hidden mb-4 border border-border">
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 hover:scale-105" />
                  </div>
                  <h2 className="font-display text-2xl text-ink">{p.name}</h2>
                  <p className="font-mono text-xs text-teal mt-1">{p.sub}</p>
                  <p className="font-mono text-xs text-muted mt-2">{p.tech}</p>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                        <span className="text-amber">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl border-t border-border">
          <h2 className="font-mono text-lg text-amber mb-8">Skills</h2>
          <div className="space-y-10">
            {Object.entries(skills).map(([category, skillList]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-display text-xl text-ink mb-4">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillList.map((skill) => {
                    const Icon = skillIconMap[skill] || TbBrandVscode;
                    return (
                      <motion.div
                        key={skill}
                        className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2"
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-5 h-5 text-teal" />
                        <span className="font-mono text-sm text-muted">{skill.replace(/ \d+-\d+$/, '')}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl border-t border-border">
          <h2 className="font-mono text-lg text-amber mb-8">Education</h2>
          <h2 className="font-display text-2xl text-ink">Bachelor of Technology</h2>
          <p className="text-sm text-muted mt-1">Rajiv Gandhi Technical University, Bhopal — 8.6 CGPA · 2021</p>

          <h2 className="font-display text-2xl text-ink mt-10">Imperial International School</h2>
          <p className="text-sm text-muted mt-1">Khachrod, district Ujjain, Madhya Pradesh — 85% · 2017</p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="min-h-screen px-6 md:px-14 py-16 md:py-24 max-w-3xl border-t border-border">
          <h2 className="font-mono text-lg text-amber mb-8">Contact</h2>
          <ContactForm />
          <p className="font-mono text-xs text-muted mt-10">
            © 2026 Ayushi Rathore — built with Next.js &amp; Tailwind CSS
          </p>
        </section>
      </main>
    </div>
  );
}