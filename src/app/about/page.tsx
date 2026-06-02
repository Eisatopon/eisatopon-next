import Link from "next/link";

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 48px)",
        color: "#f5f1e8",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .ai-span {
          color: #c9a227;
          display: inline-block;
          animation: pulse 2s ease-in-out infinite;
        }
        .about-title:hover .ai-span {
          animation: none;
          color: #e8c04a;
        }
        .about-title {
          font-size: clamp(1.5rem, 5vw, 4rem);
          margin-bottom: 2rem;
          font-family: var(--font-playfair);
          color: #f5f1e8;
          cursor: pointer;
          line-height: 1.15; white-space: nowrap;
        }
        .about-body {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          line-height: 1.9;
          color: #d6d0c4;
        }
        .about-body p {
          margin-bottom: 1.25rem;
        }
        .about-h2 {
          margin-top: clamp(2.5rem, 6vw, 4rem);
          margin-bottom: 1rem;
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-family: var(--font-playfair);
          color: #f5f1e8;
        }
        .about-list {
          padding-left: 1.5rem;
          margin-top: 1rem;
          line-height: 2;
        }
        @media (max-width: 480px) {
          .about-list {
            padding-left: 1rem;
          }
        }
      `}</style>

      <Link href="/" style={{ textDecoration: "none" }}>
        <h1 className="about-title">
          About Eisatopon<span className="ai-span">AI</span>
        </h1>
      </Link>

      <div className="about-body">
        <p>
          EisatoponAI is a premium mathematical editorial and
          problem-solving platform dedicated to the beauty of deep thinking.
        </p>

        <p>
          Founded from the long-running Eisatopon mathematical archive,
          the project combines rigorous mathematics, storytelling,
          olympiad culture, recreational problems, logic, geometry,
          number theory, combinatorics, paradoxes, and modern
          AI-assisted educational tools into a single intellectual space.
        </p>

        <p>Our goal is simple:</p>

        <p>To make mathematics feel alive.</p>

        <p>
          Not as a collection of formulas, but as a language of structure,
          creativity, elegance, and discovery.
        </p>

        <h2 className="about-h2">What We Publish</h2>

        <p>At EisatoponAI, we explore mathematics through multiple lenses:</p>

        <ul className="about-list">
          <li>Olympiad problems and advanced problem solving</li>
          <li>Number theory, geometry, algebra, and combinatorics</li>
          <li>Recreational mathematics and paradoxes</li>
          <li>Historical mathematical stories</li>
          <li>Mathematical philosophy and patterns of thought</li>
          <li>AI and mathematics</li>
          <li>Visual explanations and interactive learning</li>
        </ul>

        <h2 className="about-h2">Our Mission</h2>

        <p>To turn mathematics into a daily intellectual adventure.</p>

        <p>
          To build a space where rigorous thinking meets curiosity,
          imagination, and modern digital storytelling.
        </p>

        <p>And to remind people that mathematics is not cold.</p>

        <p>It is one of humanity's most creative achievements.</p>
      </div>
    </main>
  );
}
