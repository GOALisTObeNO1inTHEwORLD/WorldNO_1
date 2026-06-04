"use client";

import { useState } from "react";
import Link from "next/link";

export default function SDESProductPage() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "Focus Guardian Loop",
      desc: "Real-time process supervision that intercepts unauthorized software immediately, preventing distracting background applications from running.",
      icon: "🛡️",
      glow: "rgba(0, 240, 255, 0.4)",
      borderColor: "rgba(0, 240, 255, 0.3)"
    },
    {
      id: 2,
      title: "15-Second Ego Check",
      desc: "High-priority visual alert countdown giving you a final grace period to save your work before targeted process termination triggers.",
      icon: "⏱️",
      glow: "rgba(255, 0, 85, 0.4)",
      borderColor: "rgba(255, 0, 85, 0.3)"
    },
    {
      id: 3,
      title: "Edge Web Enforcer",
      desc: "Low-latency URL interceptor blocking procrastination and entertainment sites natively in the Edge browser with zero lag.",
      icon: "🌐",
      glow: "rgba(0, 240, 255, 0.4)",
      borderColor: "rgba(0, 240, 255, 0.3)"
    },
    {
      id: 4,
      title: "Workspace State Restoration",
      desc: "Smart snapshots that let you physically restore your IDE paths, terminal configurations, and folders with a single click upon boot.",
      icon: "📂",
      glow: "rgba(255, 0, 85, 0.4)",
      borderColor: "rgba(255, 0, 85, 0.3)"
    }
  ];

  const guideSteps = [
    {
      step: 1,
      title: "Download Desktop Enforcer",
      content: "Download the SDES V3 Windows desktop setup zip archive. Extract the contents to your local directory and run the installer to set up the system-level daemon."
    },
    {
      step: 2,
      title: "Install Extension Link",
      content: "Click the Store button to navigate to the Microsoft Edge Add-ons Store. Install the companion Web Enforcer extension to sync blocked URLs natively."
    },
    {
      step: 3,
      title: "Initialize & Lock Down",
      content: "Launch the desktop dashboard. Choose a manual whitelist profile, or configure the AI-automated scheduling block, then click 'Activate Lockdown' to begin your deep focus session."
    }
  ];

  return (
    <div style={{
      background: "radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.08), transparent 45%), radial-gradient(circle at 10% 70%, rgba(255, 0, 85, 0.04), transparent 40%), #030305",
      color: "#f8fafc",
      minHeight: "100vh",
      padding: "80px 24px 120px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      
      {/* Decorative cyber grid overlay background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "600px",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Cyberpunk Top Banner Badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(0, 240, 255, 0.05)",
        border: "1px solid rgba(0, 240, 255, 0.2)",
        borderRadius: "100px",
        padding: "6px 14px",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#00f0ff",
        boxShadow: "0 0 15px rgba(0, 240, 255, 0.05)",
        marginBottom: "28px",
        marginTop: "20px",
        zIndex: 1
      }}>
        <span style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#00f0ff",
          boxShadow: "0 0 8px #00f0ff"
        }} />
        SDES Ecosystem Showcase
      </div>

      {/* Hero Section */}
      <section style={{
        maxWidth: "900px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        marginBottom: "72px"
      }}>
        <h1 
          id="sdes-hero-title"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #ffffff 30%, #a5b4fc 60%, #00f0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          SDES V3: The Relentless <br/>
          <span style={{ 
            background: "linear-gradient(90deg, #00f0ff, #ff0055)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent" 
          }}>
            Focus Engine
          </span> & Digital Bodyguard
        </h1>
        
        <p style={{
          fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
          color: "#94a3b8",
          lineHeight: "1.6",
          maxWidth: "750px",
          margin: "0 auto 36px auto",
          fontWeight: 400
        }}>
          A strict system-level discipline enforcement engine engineered to eliminate digital distractions, manage active study workflows, and force absolute focus.
        </p>

        {/* Action Button CTA Grid */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "18px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          {/* Download Windows Button */}
          <Link 
            id="sdes-download-btn"
            href="/downloads/SDES_V3_Setup.zip" 
            style={{
              flex: "1 1 260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px 28px",
              background: "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 240, 255, 0.05))",
              border: "1px solid rgba(0, 240, 255, 0.4)",
              borderRadius: "14px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 240, 255, 0.05)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 240, 255, 0.15)";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(0, 240, 255, 0.08))";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 240, 255, 0.05)";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(0, 240, 255, 0.05))";
            }}
          >
            <span>💻</span>
            <span>Download Desktop App (Windows)</span>
          </Link>

          {/* Browser Extension Link */}
          <a 
            id="sdes-extension-btn"
            href="https://microsoftedge.microsoft.com/addons" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              flex: "1 1 260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px 28px",
              background: "linear-gradient(135deg, rgba(255, 0, 85, 0.1), rgba(255, 0, 85, 0.03))",
              border: "1px solid rgba(255, 0, 85, 0.3)",
              borderRadius: "14px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 0, 85, 0.03)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(255, 0, 85, 0.7)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 0, 85, 0.12)";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 0, 85, 0.2), rgba(255, 0, 85, 0.05))";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 0, 85, 0.3)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 0, 85, 0.03)";
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 0, 85, 0.1), rgba(255, 0, 85, 0.03))";
            }}
          >
            <span>🧭</span>
            <span>Get Browser Web Enforcer</span>
          </a>
        </div>
      </section>

      {/* Feature Matrix Grid Section */}
      <section style={{
        width: "100%",
        maxWidth: "1040px",
        marginBottom: "88px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
            Engine Ecosystem Mechanics
          </h2>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            How SDES V3 enforces absolute study isolation at the hardware level.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px"
        }}>
          {features.map((feat) => {
            const isHovered = hoveredCard === feat.id;
            return (
              <div 
                key={feat.id}
                id={`sdes-feature-card-${feat.id}`}
                style={{
                  background: "rgba(10, 10, 15, 0.6)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  border: "1px solid",
                  borderColor: isHovered ? feat.glow.replace("0.4", "0.6") : "rgba(255,255,255,0.06)",
                  boxShadow: isHovered 
                    ? `0 12px 30px rgba(0,0,0,0.5), 0 0 20px ${feat.glow}`
                    : "0 8px 24px rgba(0,0,0,0.4)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={() => setHoveredCard(feat.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Micro neon glow dot inside */}
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: feat.id % 2 === 0 ? "#ff0055" : "#00f0ff",
                  boxShadow: `0 0 10px ${feat.id % 2 === 0 ? "#ff0055" : "#00f0ff"}`,
                  opacity: isHovered ? 1 : 0.4,
                  transition: "opacity 0.2s"
                }} />

                <div style={{
                  fontSize: "36px",
                  marginBottom: "16px",
                  display: "inline-block"
                }}>
                  {feat.icon}
                </div>
                
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "10px"
                }}>
                  {feat.title}
                </h3>
                
                <p style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  lineHeight: "1.5"
                }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Setup Guide / Accordion Panel Section */}
      <section style={{
        width: "100%",
        maxWidth: "760px",
        marginBottom: "88px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
            Deployment Setup Guide
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Get your system configured and running in less than three minutes.
          </p>
        </div>

        {/* Tab Accordion Structure */}
        <div style={{
          background: "rgba(10, 10, 15, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)"
        }}>
          {/* Tab Selector Headers */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "12px",
            marginBottom: "20px",
            gap: "12px"
          }}>
            {guideSteps.map((s) => (
              <button
                key={s.step}
                id={`sdes-tab-btn-${s.step}`}
                onClick={() => setActiveTab(s.step)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeTab === s.step ? "#00f0ff" : "#64748b",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  position: "relative",
                  transition: "color 0.2s"
                }}
              >
                <span>Step {s.step}</span>
                {activeTab === s.step && (
                  <div style={{
                    position: "absolute",
                    bottom: "-13px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, #00f0ff, #ff0055)",
                    boxShadow: "0 0 8px rgba(0, 240, 255, 0.5)"
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Tab Panel Content */}
          <div style={{ minHeight: "130px", padding: "8px" }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{
                color: "#ff0055",
                fontSize: "14px",
                background: "rgba(255,0,85,0.1)",
                border: "1px solid rgba(255,0,85,0.2)",
                padding: "2px 8px",
                borderRadius: "6px"
              }}>
                0{activeTab}
              </span>
              {guideSteps[activeTab - 1].title}
            </h4>
            <p style={{
              fontSize: "14px",
              color: "#94a3b8",
              lineHeight: "1.6"
            }}>
              {guideSteps[activeTab - 1].content}
            </p>
          </div>
        </div>
      </section>

      {/* Deployment Device Support Warning Banner */}
      <section style={{
        width: "100%",
        maxWidth: "800px",
        background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(0, 0, 0, 0.5) 100%)",
        border: "1px solid rgba(255, 0, 85, 0.15)",
        borderRadius: "20px",
        padding: "32px",
        textAlign: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255, 0, 85, 0.1)",
          border: "1px solid rgba(255, 0, 85, 0.3)",
          color: "#ff0055",
          fontSize: "22px",
          marginBottom: "16px"
        }}>
          ⚠️
        </div>
        <h3 style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "8px"
        }}>
          Desktop Isolation Notice
        </h3>
        <p style={{
          fontSize: "13px",
          color: "#94a3b8",
          maxWidth: "600px",
          margin: "0 auto 16px auto",
          lineHeight: "1.5"
        }}>
          The SDES V3 background process watcher is strictly compatible with **Windows systems** and **Microsoft Edge** browser contexts to ensure low-level process intercepts.
        </p>
        <p style={{
          fontSize: "11px",
          color: "rgba(0, 240, 255, 0.8)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 700
        }}>
          * Remote status logs & metrics are fully responsive and viewable on mobile frames.
        </p>
      </section>

      {/* Back to select screen link */}
      <div style={{
        marginTop: "48px",
        position: "relative",
        zIndex: 1
      }}>
        <Link 
          href="/" 
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
            textDecoration: "none",
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#00f0ff"}
          onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          <span>←</span> Back to Main App
        </Link>
      </div>

    </div>
  );
}
