"use client";

import { useState } from "react";
import Link from "next/link";

export default function SDESPrivacyPage() {
  const [decrypted, setDecrypted] = useState(false);

  const plainText = `Host permission for <all_urls> is necessary to evaluate browsing destinations across any website a user attempts to visit during a strict focus session. Access to 'http://127.0.0.1:4721/*' is required to safely communicate via local fetch POST requests with the application's desktop Axum backend engine running locally on the user's machine.`;
  const cipherText = `SG9zdCBwZXJtaXNzaW9uIGZvciA8YWxsX3VybHM+IGlzIG5lY2Vzc2FyeSB0byBldmFsdWF0ZSBicm93c2luZyBkZXN0aW5hdGlvbnMgYWNyb3NzIGFueSB3ZWJzaXRlIGEgdXNlciBhdHRlbXB0cyB0byB2aXNpdCBkdXJpbmcgYSBzdHJpY3QgZm9jdXMgc2Vzc2lvbi4gQWNjZXNzIHRvICdodHRwOi8vMTI3LjAuMC4xOjQ3MjEvKicgaXMgcmVxdWlyZWQgdG8gc2FmZWx5IGNvbW11bmljYXRlIHZpYSBsb2NhbCBmZXRjaCBQT1NUIHJlcXVlc3RzIHdpdGggdGhlIGFwcGxpY2F0aW9uJ3MgZGVza3RvcCBBeHVtIGJhY2tlbmQgZW5naW5lIHJ1bm5pbmcgbG9jYWxseSBvbiB0aGUgdXNlcidzIG1hY2hpbmUu`;

  return (
    <div style={{
      background: "#030305",
      color: "#ff0055",
      minHeight: "100vh",
      padding: "60px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        background: "rgba(255, 0, 85, 0.02)",
        border: "1px dashed rgba(255, 0, 85, 0.2)",
        borderRadius: "8px",
        padding: "32px",
        boxShadow: "0 0 20px rgba(255, 0, 85, 0.05)",
        textAlign: "center"
      }}>
        <h1 
          onClick={() => setDecrypted(!decrypted)}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: decrypted ? "#00f0ff" : "#ff0055",
            letterSpacing: "0.2em",
            marginBottom: "24px",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          SDES
        </h1>

        <p style={{
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.4)",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        }}>
          {decrypted ? "Decrypted Protocol Log" : "Encrypted Privacy Block"}
        </p>

        <div style={{
          background: "rgba(0,0,0,0.6)",
          padding: "20px",
          borderRadius: "4px",
          border: "1px solid rgba(255, 0, 85, 0.1)",
          fontSize: "13px",
          lineHeight: "1.6",
          textAlign: "justify",
          color: decrypted ? "#38bdf8" : "#94a3b8",
          wordBreak: "break-all",
          fontFamily: "monospace",
          minHeight: "120px"
        }}>
          {decrypted ? plainText : cipherText}
        </div>

        <p style={{
          fontSize: "10px",
          color: "rgba(255, 255, 255, 0.2)",
          marginTop: "20px"
        }}>
          SECURE PROTOCOL V3.0 // SHIELD INTEGRITY ACTIVE
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link href="/our-products/sdes" style={{
            color: "rgba(255, 0, 85, 0.6)",
            fontSize: "12px",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255, 0, 85, 0.2)",
            paddingBottom: "2px"
          }}>
            Return
          </Link>
        </div>
      </div>
    </div>
  );
}
