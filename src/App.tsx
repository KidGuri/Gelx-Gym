import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Clock,
  Star,
  ChevronDown,
  Medal,
  Heart,
  Users,
  Sparkles,
  Menu,
  X,
  MapPin,
} from "lucide-react";

function Instagram({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const PHONE = "673 77 85 48";
const ADDRESS = "Polígono de Carrus, Carrer Oropesa, 8, 03206 Elx, Alicante";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Club+Gelx+Gimnasia+Artistica+Elche";
const INSTAGRAM_URL = "https://www.instagram.com/clubgelx";
const GOOGLE_REVIEWS =
  "https://www.google.com/maps/search/?api=1&query=Club+Gelx+Gimnasia+Artistica+Elche";

const ACCENT = "#7c3aed";
const ACCENT_LIGHT = "#8b5cf6";

const FEATURES_DATA = [
  {
    icon: Medal,
    title: "Competición Nacional",
    desc: "Participación regular en campeonatos nacionales con resultados destacados en aparatos como paralelas, barra y suelo.",
  },
  {
    icon: Heart,
    title: "Pasión y Dedicación",
    desc: "Equipo técnico comprometido con el desarrollo integral de cada gimnasta, desde las categorías base hasta la alta competición.",
  },
  {
    icon: Users,
    title: "Espíritu de Equipo",
    desc: "Una familia donde crecer como deportista y como persona. Familias y cuerpo técnico unidos en un proyecto deportivo común.",
  },
  {
    icon: Sparkles,
    title: "Todas las Categorías",
    desc: "Formación para todas las edades y niveles. Desde iniciación hasta la máxima exigencia técnica en gimnasia artística.",
  },
];

const REVIEWS_DATA = [
  {
    name: "Ana M.",
    text: "Mi hija lleva dos años en el club y su progresión ha sido increíble. Las entrenadoras son profesionales, cariñosas y saben sacar lo mejor de cada gimnasta.",
  },
  {
    name: "Carmen R.",
    text: "El mejor club de gimnasia artística de Elche. Mis dos hijas están encantadas y han conseguido medallas en competiciones nacionales.",
  },
  {
    name: "Patricia L.",
    text: "Excelente ambiente y muy buenas instalaciones. Las niñas aprenden disciplina, constancia y valores deportivos fundamentales.",
  },
  {
    name: "José A. G.",
    text: "Llevamos a nuestra hija desde los 4 años y estamos encantados. El equipo técnico es de primer nivel y el trato es familiar.",
  },
  {
    name: "Laura S.",
    text: "Muy contenta con el trato y la profesionalidad del club. Se nota que trabajan con pasión y verdadera dedicación por la gimnasia.",
  },
  {
    name: "Miguel Á. P.",
    text: "Club serio y comprometido con la formación deportiva. Los resultados en competiciones nacionales hablan por sí solos.",
  },
  {
    name: "Sofía V.",
    text: "Las entrenadoras sacan lo mejor de cada gimnasta. Mi hija ha ganado confianza, disciplina y muchas amigas.",
  },
  {
    name: "Isabel D.",
    text: "Un club familiar donde las niñas crecen como deportistas y como personas. Totalmente recomendable para cualquier edad.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeInImage({
  src,
  alt,
  style,
  onMouseOver,
  onMouseOut,
  loading,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  onMouseOver?: React.MouseEventHandler<HTMLImageElement>;
  onMouseOut?: React.MouseEventHandler<HTMLImageElement>;
  loading?: "lazy" | "eager";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={
        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }
      }
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
}

function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch || !ref.current) return;

    ref.current.style.display = "block";

    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        const size = isHovering.current ? 40 : 12;
        ref.current.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
      }
    };

    const onLeave = () => {
      if (ref.current)
        ref.current.style.transform = "translate(-100px, -100px)";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, .feature-card"
      );
      if (interactive && ref.current) {
        isHovering.current = true;
        ref.current.style.width = "40px";
        ref.current.style.height = "40px";
        ref.current.style.background = "#1a1a2e";
        ref.current.style.mixBlendMode = "difference";
        ref.current.style.borderRadius = "50%";
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, .feature-card"
      );
      if (interactive && ref.current) {
        isHovering.current = false;
        ref.current.style.width = "12px";
        ref.current.style.height = "12px";
        ref.current.style.background = ACCENT;
        ref.current.style.mixBlendMode = "normal";
        ref.current.style.borderRadius = "0";
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        background: ACCENT,
        pointerEvents: "none",
        zIndex: 9999,
        display: "none",
        willChange: "transform",
        transition:
          "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, mix-blend-mode 0.3s, border-radius 0.3s",
      }}
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Disciplinas", href: "#disciplinas" },
    { label: "Opiniones", href: "#opiniones" },
    { label: "Horario", href: "#horario" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.5s",
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(124,58,237,0.08)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
        }}
      >
        <a href="#">
          <img
            src={scrolled ? "/logo.png" : "/logo-white.png"}
            alt="Club Gelx"
            style={{
              height: 45,
              transition: "opacity 0.5s",
            }}
          />
        </a>

        <div className="nav-desktop">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: scrolled
                  ? "rgba(26,26,46,0.5)"
                  : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = scrolled
                  ? ACCENT
                  : ACCENT_LIGHT)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = scrolled
                  ? "rgba(26,26,46,0.5)"
                  : "rgba(255,255,255,0.6)")
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            style={{
              marginLeft: 16,
              padding: "10px 24px",
              border: scrolled
                ? `1px solid rgba(124,58,237,0.3)`
                : "1px solid rgba(255,255,255,0.3)",
              color: scrolled ? ACCENT : "#fff",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Llámanos
          </a>
        </div>

        <div className="nav-mobile-btn">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: scrolled
                ? "rgba(26,26,46,0.7)"
                : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile-menu"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid rgba(124,58,237,0.08)`,
          }}
        >
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(26,26,46,0.5)",
                  textDecoration: "none",
                  padding: "8px 0",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 8,
                padding: "12px 24px",
                border: `1px solid rgba(124,58,237,0.3)`,
                color: ACCENT,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Llámanos
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#1a1a2e",
      }}
    >
      <motion.div
        style={{
          scale,
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/hero-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px) brightness(0.3)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,26,46,0.4), rgba(26,26,46,0.5), #fafafa)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{
          opacity,
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 20px",
          maxWidth: 900,
          width: "100%",
          marginTop: "-6vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo-white.png"
            alt="Club Gelx"
            className="hero-logo"
            style={{
              margin: "0 auto 48px",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            color: `${ACCENT_LIGHT}cc`,
            fontSize: "clamp(10px, 2.5vw, 16px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Club de Gimnasia Artística en Elche
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(28px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 32,
          }}
        >
          <span style={{ fontWeight: 200 }}>Donde nacen</span>
          <br />
          <span style={{ color: ACCENT_LIGHT, fontWeight: 700 }}>
            las campeonas
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 48px)",
            marginBottom: 40,
          }}
        >
          {[
            { value: "4.7", label: "Estrellas" },
            { value: "38", label: "Opiniones" },
            { value: "Nacional", label: "Competición" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <span
                style={{
                  fontSize: "clamp(18px, 3.5vw, 28px)",
                  fontWeight: 700,
                  color: ACCENT_LIGHT,
                  letterSpacing: "-0.02em",
                  display: "block",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "clamp(9px, 1.5vw, 11px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            style={{
              padding: "16px 32px",
              background: ACCENT,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
              borderRadius: 2,
            }}
          >
            Únete al Club
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ marginTop: 32, display: "flex", justifyContent: "center" }}
        >
          <ChevronDown
            size={24}
            color={ACCENT_LIGHT}
            style={{ opacity: 0.5, animation: "bounce 2s infinite" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  const stats = [
    { value: "4.7", label: "Estrellas" },
    { value: "38", label: "Opiniones" },
    { value: "Nacional", label: "Nivel" },
  ];

  return (
    <section
      id="nosotros"
      style={{ background: "#fafafa", color: "#1a1a2e", padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="about-layout">
          <Reveal className="about-text">
            <p
              style={{
                color: `${ACCENT}cc`,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Sobre nosotros
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 28,
              }}
            >
              <span style={{ fontWeight: 200 }}>Más que un club,</span>
              <br />
              <span style={{ color: ACCENT, fontWeight: 700 }}>
                una familia
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                color: "rgba(26,26,46,0.55)",
                lineHeight: 1.8,
                fontSize: 15,
              }}
            >
              <p>
                El Club Gelx Gimnasia Artística es un club deportivo
                especializado en gimnasia artística con sede en Elche. Su
                actividad está orientada a la formación y competición de
                gimnastas en distintas categorías de edad y nivel, desde las
                categorías base hasta niveles de mayor exigencia técnica.
              </p>
              <p>
                El club participa regularmente en competiciones de ámbito
                nacional, destacando en el Campeonato Nacional de Gimnasia
                Artística Base celebrado en el Navarra Arena de Pamplona, donde
                varias gimnastas obtuvieron posiciones destacadas en aparatos
                como paralelas, barra y suelo.
              </p>
            </div>

            <div
              className="about-stats"
              style={{ justifyContent: "flex-start" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: "clamp(24px, 5vw, 36px)",
                      fontWeight: 700,
                      color: ACCENT,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      display: "block",
                      color: "rgba(26,26,46,0.35)",
                      fontSize: "clamp(9px, 1.5vw, 11px)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25} className="about-image">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                aspectRatio: "16 / 10",
              }}
            >
              <FadeInImage
                src="/club-photo.webp"
                alt="Gimnastas del Club Gelx"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(250,250,250,0.2), transparent 40%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof FEATURES_DATA)[0];
  delay: number;
}) {
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <Reveal delay={delay}>
      <div
        className="feature-card"
        style={{
          background: "#fff",
          border: "1px solid rgba(26,26,46,0.06)",
          borderTop: "3px solid transparent",
          borderRadius: 4,
          padding: "24px 16px",
          height: "100%",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          maxWidth: 400,
          width: "100%",
          margin: "0 auto",
          boxShadow: "0 2px 12px rgba(26,26,46,0.04)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = `${ACCENT}22`;
          e.currentTarget.style.borderTopColor = ACCENT;
          e.currentTarget.style.boxShadow = `0 12px 40px rgba(124,58,237,0.1)`;
          e.currentTarget.style.transform = "scale(1.02)";
          if (iconRef.current) {
            iconRef.current.style.background = ACCENT;
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = "rgba(26,26,46,0.06)";
          e.currentTarget.style.borderTopColor = "transparent";
          e.currentTarget.style.boxShadow =
            "0 2px 12px rgba(26,26,46,0.04)";
          e.currentTarget.style.transform = "scale(1)";
          if (iconRef.current) {
            iconRef.current.style.background = `${ACCENT}12`;
          }
        }}
      >
        <div
          ref={iconRef}
          style={{
            width: 48,
            height: 48,
            borderRadius: 4,
            background: `${ACCENT}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            transition: "background 0.5s",
          }}
        >
          <feature.icon
            size={22}
            color={ACCENT}
            className="feature-icon"
          />
        </div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 12,
            letterSpacing: "-0.01em",
            color: "#1a1a2e",
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            color: "rgba(26,26,46,0.5)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {feature.desc}
        </p>
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section
      id="disciplinas"
      style={{
        background: "#f5f5f7",
        color: "#1a1a2e",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                color: `${ACCENT}cc`,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Nuestros valores
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              <span style={{ fontWeight: 200 }}>Lo que nos hace</span>{" "}
              <span style={{ color: ACCENT, fontWeight: 700 }}>
                diferentes
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="features-grid">
          {FEATURES_DATA.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 0.15} />
          ))}
        </div>
      </div>

      <style>{`
        .feature-card:hover .feature-icon {
          color: #fff !important;
          stroke: #fff !important;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ r }: { r: (typeof REVIEWS_DATA)[0] }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(26,26,46,0.06)",
        borderRadius: 4,
        padding: 32,
        width: 350,
        minWidth: 350,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 12px rgba(26,26,46,0.04)",
      }}
    >
      <div style={{ display: "flex", marginBottom: 16 }}>
        {[...Array(5)].map((_, j) => (
          <Star key={j} size={14} fill={ACCENT} color={ACCENT} />
        ))}
      </div>
      <p
        style={{
          color: "rgba(26,26,46,0.6)",
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 24,
          flex: 1,
        }}
      >
        &ldquo;{r.text}&rdquo;
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `${ACCENT}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ACCENT,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {r.name[0]}
        </div>
        <span
          style={{
            color: "rgba(26,26,46,0.8)",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {r.name}
        </span>
      </div>
    </div>
  );
}

function Reviews() {
  const row1 = REVIEWS_DATA.slice(0, 4);
  const row2 = REVIEWS_DATA.slice(4, 8);

  const row1Doubled = [...row1, ...row1];
  const row2Doubled = [...row2, ...row2];

  return (
    <section
      id="opiniones"
      style={{
        background: "#f5f5f7",
        color: "#1a1a2e",
        paddingTop: 120,
        paddingBottom: 120,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                color: `${ACCENT}cc`,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Opiniones
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ fontWeight: 200 }}>Lo que dicen</span>{" "}
              <span style={{ color: ACCENT, fontWeight: 700 }}>
                las familias
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginTop: 24,
              }}
            >
              <span style={{ display: "flex" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={ACCENT} color={ACCENT} />
                ))}
              </span>
              <span
                style={{ color: "rgba(26,26,46,0.45)", fontSize: 14 }}
              >
                4.7 de 5 — 38 opiniones en Google
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        style={{
          overflow: "hidden",
          width: "100%",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            animation: "marqueeLeft 40s linear infinite",
            width: "max-content",
          }}
        >
          {row1Doubled.map((r, i) => (
            <ReviewCard key={`row1-${i}`} r={r} />
          ))}
        </div>
      </div>

      <div
        style={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            animation: "marqueeRight 40s linear infinite",
            width: "max-content",
          }}
        >
          {row2Doubled.map((r, i) => (
            <ReviewCard key={`row2-${i}`} r={r} />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <Reveal delay={0.4}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href={GOOGLE_REVIEWS}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: `${ACCENT}b3`,
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              Ver todas las opiniones en Google
              <ChevronDown
                size={14}
                style={{ transform: "rotate(-90deg)" }}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParallaxCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: 450,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          y,
          position: "absolute",
          inset: "-20% 0",
          backgroundImage: "url(/club-photo.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,26,46,0.6), rgba(26,26,46,0.4), rgba(26,26,46,0.4), rgba(26,26,46,0.6))",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 24px",
        }}
      >
        <Reveal>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 300,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            El esfuerzo de hoy es el{" "}
            <span style={{ color: ACCENT_LIGHT, fontWeight: 600 }}>
              triunfo de mañana
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: 2,
              transition: "all 0.3s",
            }}
          >
            <Instagram size={18} />
            Síguenos en Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Schedule() {
  const hours = [
    { day: "Lunes", time: "16:45 – 20:30" },
    { day: "Martes", time: "16:45 – 20:30" },
    { day: "Miércoles", time: "16:45 – 20:30" },
    { day: "Jueves", time: "16:45 – 20:30" },
    { day: "Viernes", time: "17:30 – 20:30" },
    { day: "Sábado", time: "Cerrado" },
    { day: "Domingo", time: "Cerrado" },
  ];

  return (
    <section
      id="horario"
      style={{
        background: "#fafafa",
        color: "#1a1a2e",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                color: `${ACCENT}cc`,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Horario
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ fontWeight: 200 }}>Abiertos cuando</span>{" "}
              <span style={{ color: ACCENT, fontWeight: 700 }}>
                nos necesitas
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(26,26,46,0.06)",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(26,26,46,0.04)",
            }}
          >
            {hours.map((h, i) => (
              <div
                key={h.day}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 32px",
                  borderBottom:
                    i < hours.length - 1
                      ? "1px solid rgba(26,26,46,0.05)"
                      : "none",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontWeight: 500,
                    color: "rgba(26,26,46,0.65)",
                    fontSize: 15,
                  }}
                >
                  <Clock size={16} color={`${ACCENT}80`} />
                  {h.day}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    fontSize: 15,
                    color:
                      h.time === "Cerrado"
                        ? "rgba(26,26,46,0.25)"
                        : ACCENT,
                  }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const contactItems = [
    {
      title: "Teléfono",
      icon: Phone,
      info: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
    },
    {
      title: "Instagram",
      icon: Instagram,
      info: "@clubgelx",
      href: INSTAGRAM_URL,
      external: true,
    },
    {
      title: "Ubicación",
      icon: MapPin,
      info: ADDRESS,
      href: MAPS_URL,
      external: true,
    },
  ];

  return (
    <section
      id="contacto"
      style={{
        background: "#fafafa",
        color: "#1a1a2e",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                color: `${ACCENT}cc`,
                fontSize: 13,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Contacto
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ fontWeight: 200 }}>¿Listo para</span>{" "}
              <span style={{ color: ACCENT, fontWeight: 700 }}>
                empezar?
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                gap: 0,
                border: `1px solid rgba(26,26,46,0.08)`,
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 40,
              }}
            >
              {contactItems.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => setActiveTab(i)}
                  style={{
                    padding: "12px 24px",
                    background:
                      activeTab === i ? ACCENT : "transparent",
                    color:
                      activeTab === i
                        ? "#fff"
                        : "rgba(26,26,46,0.45)",
                    border: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transition: "all 0.4s",
                  }}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={contactItems[activeTab].href}
                target={
                  contactItems[activeTab].external ? "_blank" : undefined
                }
                rel={
                  contactItems[activeTab].external
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  textDecoration: "none",
                  color: ACCENT,
                  fontSize: "clamp(16px, 3vw, 22px)",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  transition: "opacity 0.4s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {contactItems[activeTab].info}
              </a>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            style={{
              marginTop: 64,
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(26,26,46,0.06)",
              height: 400,
              boxShadow: "0 2px 12px rgba(26,26,46,0.04)",
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=Club+Gelx+Gimnasia+Artistica,+Carrer+Oropesa+8,+03206+Elx&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Club Gelx Gimnasia Artística"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        maxWidth: 120,
        margin: "0 auto",
        height: 1,
        background: `linear-gradient(to right, transparent, ${ACCENT}30, transparent)`,
      }}
    />
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(26,26,46,0.06)",
        padding: "48px 24px",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <img
          src="/logo.png"
          alt="Club Gelx"
          style={{ height: 45 }}
        />

        <div
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          {[
            {
              icon: Instagram,
              href: INSTAGRAM_URL,
              external: true,
            },
            {
              icon: Phone,
              href: `tel:${PHONE.replace(/\s/g, "")}`,
              external: false,
            },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={
                s.external ? "noopener noreferrer" : undefined
              }
              style={{
                color: "rgba(26,26,46,0.25)",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = ACCENT)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color =
                  "rgba(26,26,46,0.25)")
              }
            >
              <s.icon size={20} />
            </a>
          ))}
        </div>

        <p
          style={{
            color: "rgba(26,26,46,0.2)",
            fontSize: 12,
            letterSpacing: "0.03em",
          }}
        >
          © {new Date().getFullYear()} Club Gelx Gimnasia Artística.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <ParallaxCTA />
      <Reviews />
      <SectionDivider />
      <Schedule />
      <SectionDivider />
      <Contact />
      <Footer />
    </div>
  );
}
