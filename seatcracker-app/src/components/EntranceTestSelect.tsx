"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SelectScreen.module.css";

interface Props {
  currentTest: string;
  onNext: (test: string) => void;
  onBack: () => void;
}

const TESTS = [
  // Engineering / Technology
  { id: "EAMCET", label: "EAMCET", desc: "Engineering, Agriculture & Medical Common Entrance Test (AP & TS)", icon: "🎓", active: true },
  { id: "JEE", label: "JEE Advanced", desc: "Joint Entrance Examination - Advanced (Entrance for IITs)", icon: "📐", active: true },
  { id: "JEE_MAIN", label: "JEE Main", desc: "Entrance for NITs, IIITs, and other engineering colleges", icon: "🏢", active: false },
  { id: "BITSAT", label: "BITSAT", desc: "Entrance for BITS Pilani campuses", icon: "🏫", active: false },
  
  // Medical
  { id: "NEET", label: "NEET", desc: "Entrance for MBBS, BDS, and medical courses", icon: "🩺", active: false },
  { id: "AIIMS", label: "AIIMS Entrance Exam", desc: "Previously for AIIMS (now merged into NEET)", icon: "🏥", active: false },
  
  // Government Jobs
  { id: "UPSC", label: "UPSC Civil Services Exam", desc: "Recruitment for IAS, IPS, IFS", icon: "⚖️", active: false },
  { id: "SSC_CGL", label: "SSC CGL", desc: "Central government jobs", icon: "👔", active: false },
  { id: "IBPS_PO", label: "IBPS PO", desc: "Banking jobs (Probationary Officer)", icon: "💰", active: false },
  { id: "RRB_NTPC", label: "RRB NTPC", desc: "Railway jobs", icon: "🚂", active: false },
  
  // Management / Business
  { id: "CAT", label: "CAT", desc: "MBA entrance for IIMs and top B-schools", icon: "📈", active: false },
  { id: "XAT", label: "XAT", desc: "MBA entrance for XLRI and other institutes", icon: "📝", active: false },
  { id: "GMAT", label: "GMAT", desc: "MBA entrance for international universities", icon: "🌎", active: true },
  
  // Law
  { id: "CLAT", label: "CLAT", desc: "Entrance for National Law Universities", icon: "⚖️", active: false },
  { id: "AILET", label: "AILET", desc: "Entrance for NLU Delhi", icon: "🏛️", active: false },
  
  // Science / Research
  { id: "GATE", label: "GATE", desc: "M.Tech admissions and PSU jobs", icon: "🔬", active: false },
  { id: "CSIR_NET", label: "CSIR NET", desc: "Research fellowship and lectureship", icon: "🧬", active: false },
  { id: "UGC_NET", label: "UGC NET", desc: "Eligibility for Assistant Professor", icon: "🎓", active: false },
  
  // Abroad Studies
  { id: "GRE", label: "GRE", desc: "MS and higher studies abroad", icon: "✈️", active: true },
  { id: "IELTS", label: "IELTS", desc: "English proficiency for study/work abroad", icon: "🗣️", active: true },
  { id: "TOEFL", label: "TOEFL", desc: "English proficiency test for universities", icon: "📝", active: true },
  
  // Defence
  { id: "NDA", label: "NDA Exam", desc: "Entry into Army, Navy, Air Force after 12th", icon: "⚔️", active: false },
  { id: "CDS", label: "CDS Exam", desc: "Entry into defence services after graduation", icon: "🛡️", active: false },
];

export default function EntranceTestSelect({ currentTest, onNext, onBack }: Props) {
  const [selected, setSelected] = useState(currentTest || "EAMCET");
  const [search, setSearch] = useState("");
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  const filteredTests = TESTS.filter(test => 
    test.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgOrb} />
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "12px", flexWrap: "wrap" }}>
          <button className={styles.backBtn} onClick={onBack} id="test-back-btn" style={{ marginBottom: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button 
            onClick={() => setShowProjectsModal(true)}
            style={{
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 85, 0.1))",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              borderRadius: "100px",
              padding: "8px 16px",
              fontSize: "13px",
              color: "#00f0ff",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.3s ease",
              boxShadow: "0 0 10px rgba(0, 240, 255, 0.1)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 85, 0.2))";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 240, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 85, 0.1))";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
            }}
          >
            🚀 Explore Our Projects
          </button>

          <div style={{ position: "relative", width: "180px" }}>
            <input 
              type="text" 
              placeholder="Search Exam..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                borderRadius: "100px", padding: "8px 12px 8px 32px", fontSize: "13px", color: "var(--text)",
                outline: "none"
              }}
            />
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.5, fontSize: "12px" }}>🔍</span>
          </div>
        </div>

        <div className={styles.stepIndicator}>
          <span className={styles.stepDot} data-active="true" />
          <span className={styles.stepLine} />
          <span className={styles.stepDot} />
          <span className={styles.stepLine} />
          <span className={styles.stepDot} />
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Choose your <span className={styles.accent}>Entrance Test</span></h1>
          <p className={styles.sub}>Select the test you are preparing for to start your journey</p>
        </div>

        <div className={styles.optionsList}>
          {filteredTests.map((test) => (
            <button
              key={test.id}
              id={`test-option-${test.id.toLowerCase()}`}
              className={`${styles.optionCard} ${selected === test.id ? styles.optionSelected : ""} ${!test.active ? styles.optionDisabled : ""}`}
              onClick={() => test.active && setSelected(test.id)}
              aria-pressed={selected === test.id}
              disabled={!test.active}
            >
              <span className={styles.optionIcon}>{test.icon}</span>
              <div className={styles.optionText}>
                <span className={styles.optionLabel}>{test.label}</span>
                <span className={styles.optionDesc}>{test.desc}</span>
              </div>
              <span className={styles.optionCheck}>
                {selected === test.id && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {!test.active && <span style={{ fontSize: "10px", opacity: 0.5 }}>Soon</span>}
              </span>
            </button>
          ))}
          {filteredTests.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No exams found for "{search}"
            </div>
          )}
        </div>

        <button
          id="test-next-btn"
          className={`${styles.nextBtn} ${!selected ? styles.nextDisabled : ""}`}
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          Next — Select State
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {showProjectsModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(3, 3, 5, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: "20px"
        }} onClick={() => setShowProjectsModal(false)}>
          <div style={{
            background: "rgba(10, 10, 15, 0.9)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(255, 0, 85, 0.05)",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "460px",
            padding: "28px",
            position: "relative",
            color: "#f8fafc"
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setShowProjectsModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontSize: "20px",
                transition: "color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "#ff0055"}
              onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "22px" }}>🚀</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, background: "linear-gradient(90deg, #00f0ff, #ff0055)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  SeatCracker Ecosystem
                </h3>
              </div>
              <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.4" }}>
                Explore companion utilities designed to boost your academic productivity and focus.
              </p>
            </div>

            {/* Project List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* SDES V3 Focus Engine Card */}
              <Link 
                href="/our-products/sdes"
                onClick={() => setShowProjectsModal(false)}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px",
                  padding: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)";
                  e.currentTarget.style.background = "rgba(0, 240, 255, 0.02)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "20px" }}>🛡️</span>
                    <span style={{ fontWeight: 700, fontSize: "15px", color: "#fff" }}>SDES V3 Focus Engine</span>
                  </div>
                  <span style={{ fontSize: "10px", background: "rgba(0, 240, 255, 0.15)", color: "#00f0ff", padding: "2px 8px", borderRadius: "100px", fontWeight: 700, textTransform: "uppercase" }}>
                    Focus Block
                  </span>
                </div>
                
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 12px", lineHeight: "1.4" }}>
                  A strict system-level discipline enforcement engine engineered to eliminate digital distractions, block sites, and force absolute focus.
                </p>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#00f0ff"
                }}>
                  <span>Explore Product</span>
                  <span>→</span>
                </div>
              </Link>
              
              {/* SeatCracker Main Platform */}
              <div style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "14px",
                padding: "14px",
                opacity: 0.8
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>🎓</span>
                    <span style={{ fontWeight: 600, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>SeatCracker Test Series</span>
                  </div>
                  <span style={{ fontSize: "9px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", padding: "1px 6px", borderRadius: "100px", fontWeight: 700 }}>
                    Active
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                  Smart preparation platform with topic practice, analytical dashboard, and simulated mocks.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setShowProjectsModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#f8fafc",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
