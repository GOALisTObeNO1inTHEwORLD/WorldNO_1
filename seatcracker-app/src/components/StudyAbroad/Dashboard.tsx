"use client";

import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

interface Section {
  sectionId: string;
  sectionTitle: string;
}

interface ExamData {
  examId: string;
  examTitle: string;
  sections: Section[];
}

interface Props {
  examId: string;
  onBack: () => void;
  onStartPractice: (sectionId: string, mode: "practice" | "battle" | "cheatcode") => void;
}

const EXAM_THEMES: Record<string, { primary: string; accent: string; glow: string }> = {
  gre: { primary: "#10b981", accent: "#34d399", glow: "rgba(16, 185, 129, 0.2)" },
  gmat: { primary: "#38bdf8", accent: "#0ea5e9", glow: "rgba(56, 189, 248, 0.2)" },
  ielts: { primary: "#a78bfa", accent: "#8b5cf6", glow: "rgba(167, 139, 250, 0.2)" },
  toefl: { primary: "#f43f5e", accent: "#e11d48", glow: "rgba(244, 63, 94, 0.2)" },
};

export default function StudyAbroadDashboard({ examId, onBack, onStartPractice }: Props) {
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [selectedMode, setSelectedMode] = useState<"practice" | "battle" | "cheatcode">("practice");
  const [activeSection, setActiveSection] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const theme = EXAM_THEMES[examId.toLowerCase()] || EXAM_THEMES.gre;

  useEffect(() => {
    fetch(`/data/exams/${examId.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((data) => {
        setExamData(data);
        if (data.sections?.length > 0) {
          setActiveSection(data.sections[0].sectionId);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading exam data:", err);
        setLoading(false);
      });
  }, [examId]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} style={{ borderColor: `${theme.primary} transparent transparent transparent` }} />
        <p>Loading Exam Dashboard...</p>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Failed to load exam details.</h2>
        <button onClick={onBack} className={styles.backBtn}>Go Back</button>
      </div>
    );
  }

  return (
    <main className={styles.wrapper}>
      {/* Background Orbs */}
      <div className={styles.bgOrb} style={{ background: theme.glow }} />
      <div className={styles.bgOrb2} style={{ background: theme.glow }} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Exit Dashboard
          </button>
          <span className={styles.badge} style={{ color: theme.primary, borderColor: theme.primary }}>
            STUDY ABROAD PRO
          </span>
        </header>

        {/* Hero Title */}
        <div className={styles.heroSection}>
          <h1 className={styles.title}>
            Master the <span className={styles.accent} style={{ color: theme.primary }}>{examData.examTitle}</span>
          </h1>
          <p className={styles.subtitle}>
            Select your preparation path, target specific sections, and crack the score you need for your dream university.
          </p>
        </div>

        {/* Mode Selector */}
        <div className={styles.modeGrid}>
          {[
            {
              id: "practice",
              title: "Today's Practice",
              icon: "📚",
              desc: "Deep dive section-by-section. Practice 10 real exam questions with comprehensive solutions and instant feedback.",
              tag: "RECOMMENDED",
            },
            {
              id: "battle",
              title: "Real Battle Mode",
              icon: "⚔️",
              desc: "Simulate a live exam. Test yourself against the clock under real-pressure constraints to build stamina.",
              tag: "CHALLENGING",
            },
            {
              id: "cheatcode",
              title: "CheatCode Mode",
              icon: "⚡",
              desc: "Master key shortcuts, high-frequency patterns, and strategies to instantly solve tricky questions.",
              tag: "SMART PREP",
            },
          ].map((mode) => (
            <button
              key={mode.id}
              className={`${styles.modeCard} ${selectedMode === mode.id ? styles.modeSelected : ""}`}
              onClick={() => setSelectedMode(mode.id as any)}
              style={selectedMode === mode.id ? { borderColor: theme.primary, boxShadow: `0 0 25px ${theme.glow}` } : {}}
            >
              <div className={styles.cardHeader}>
                <span className={styles.modeIcon}>{mode.icon}</span>
                <span className={styles.modeTag} style={{ background: theme.glow, color: theme.primary }}>{mode.tag}</span>
              </div>
              <h3 className={styles.modeTitle}>{mode.title}</h3>
              <p className={styles.modeDesc}>{mode.desc}</p>
            </button>
          ))}
        </div>

        {/* Section List (Today's Practice Focus) */}
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionHeading}>
            {selectedMode === "practice" ? "Select Section to Practice" : selectedMode === "battle" ? "Select Battle Sector" : "Select Topic Breakdown"}
          </h2>
          <div className={styles.sectionGrid}>
            {examData.sections.map((section) => (
              <button
                key={section.sectionId}
                className={`${styles.sectionCard} ${activeSection === section.sectionId ? styles.sectionSelected : ""}`}
                onClick={() => setActiveSection(section.sectionId)}
                style={activeSection === section.sectionId ? { borderColor: theme.primary, background: `linear-gradient(135deg, ${theme.glow} 0%, rgba(255,255,255,0.01) 100%)` } : {}}
              >
                <div className={styles.sectionInfo}>
                  <h4 className={styles.sectionTitle}>{section.sectionTitle}</h4>
                  <span className={styles.questionCount}>10 Real Questions</span>
                </div>
                <div
                  className={styles.sectionDot}
                  style={{ background: activeSection === section.sectionId ? theme.primary : "transparent" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Start Action Action Button */}
        <div className={styles.actionRow}>
          <button
            onClick={() => onStartPractice(activeSection, selectedMode)}
            className={styles.startBtn}
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
              boxShadow: `0 8px 30px ${theme.glow}`,
            }}
          >
            Launch {selectedMode === "practice" ? "Practice Session" : selectedMode === "battle" ? "Mock Battle 💀" : "CheatCode Trainer"}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
