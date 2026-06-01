"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./PracticeArena.module.css";

interface Question {
  id: string;
  type: "multiple_choice" | "essay" | string;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface Section {
  sectionId: string;
  sectionTitle: string;
  questions: Question[];
}

interface ExamData {
  examId: string;
  examTitle: string;
  sections: Section[];
}

interface Props {
  examId: string;
  sectionId: string;
  mode: "practice" | "battle" | "cheatcode";
  onBack: () => void;
}

const THEMES: Record<string, { primary: string; accent: string; glow: string }> = {
  gre: { primary: "#10b981", accent: "#34d399", glow: "rgba(16, 185, 129, 0.2)" },
  gmat: { primary: "#38bdf8", accent: "#0ea5e9", glow: "rgba(56, 189, 248, 0.2)" },
  ielts: { primary: "#a78bfa", accent: "#8b5cf6", glow: "rgba(167, 139, 250, 0.2)" },
  toefl: { primary: "#f43f5e", accent: "#e11d48", glow: "rgba(244, 63, 94, 0.2)" },
};

export default function StudyAbroadPracticeArena({ examId, sectionId, mode, onBack }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [essayResponses, setEssayResponses] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Timer
  const [time, setTime] = useState(mode === "battle" ? 1800 : 0); // 30 mins for battle, 0 upwards for practice
  const timerRef = useRef<any>(null);

  const theme = THEMES[examId.toLowerCase()] || THEMES.gre;

  useEffect(() => {
    fetch(`/data/exams/${examId.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((data: ExamData) => {
        const section = data.sections.find((s) => s.sectionId === sectionId);
        if (section) {
          setQuestions(section.questions || []);
          setSectionTitle(section.sectionTitle);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });

    // Start Timer
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (mode === "battle") {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setFinished(true);
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [examId, sectionId, mode]);

  const handleSelectOption = (qId: string, option: string) => {
    if (submittedAnswers[qId]) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleTextChange = (qId: string, val: string) => {
    if (submittedAnswers[qId]) return;
    setEssayResponses((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitQuestion = (qId: string) => {
    setSubmittedAnswers((prev) => ({ ...prev, [qId]: true }));
  };

  const handleFinish = () => {
    clearInterval(timerRef.current);
    setFinished(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} style={{ borderColor: `${theme.primary} transparent transparent transparent` }} />
        <p>Syncing question banks...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <h2>No questions available in this section yet.</h2>
        <button onClick={onBack} className={styles.backBtn}>Return to Dashboard</button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const isEssay = currentQ?.type === "essay";
  const selectedOption = userAnswers[currentQ?.id] || "";
  const writtenText = essayResponses[currentQ?.id] || "";
  const isQuestionSubmitted = submittedAnswers[currentQ?.id] || false;

  // Calculate results
  const correctCount = questions.filter(
    (q) => q.type !== "essay" && userAnswers[q.id] === q.correctAnswer
  ).length;

  const essayCount = questions.filter((q) => q.type === "essay").length;
  const answeredCount = Object.keys(userAnswers).length + Object.keys(essayResponses).length;

  return (
    <div className={styles.layout}>
      {/* Sidebar navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sectionBadge} style={{ background: theme.glow, color: theme.primary }}>
            {sectionTitle}
          </span>
        </div>
        <div className={styles.navGrid}>
          {questions.map((q, idx) => {
            const isQAnswered = userAnswers[q.id] || essayResponses[q.id];
            const isQSubmitted = submittedAnswers[q.id];
            let dotClass = styles.navBtn;
            if (currentIdx === idx) dotClass += ` ${styles.navActive}`;
            else if (isQSubmitted) dotClass += ` ${styles.navSubmitted}`;
            else if (isQAnswered) dotClass += ` ${styles.navAnswered}`;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={dotClass}
                style={currentIdx === idx ? { borderColor: theme.primary, background: theme.glow } : {}}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div className={styles.sidebarFooter}>
          <button onClick={handleFinish} className={styles.finishBtn} style={{ background: theme.primary }}>
            Submit Practice Test
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className={styles.main}>
        {/* Top Header */}
        <header className={styles.topBar}>
          <button onClick={onBack} className={styles.backBtn}>
            ← Exit Test
          </button>

          {/* Glowing Timer */}
          <div
            className={styles.timer}
            style={{
              borderColor: mode === "battle" ? "#ef4444" : theme.primary,
              boxShadow: `0 0 15px ${mode === "battle" ? "rgba(239, 68, 68, 0.15)" : theme.glow}`,
            }}
          >
            <span className={styles.timerIcon}>{mode === "battle" ? "⏱️" : "⏱️"}</span>
            <span className={styles.timeStr}>{formatTime(time)}</span>
          </div>
        </header>

        <div className={styles.contentArea}>
          {/* RESULTS DISPLAY */}
          {finished ? (
            <div className={styles.resultsCard}>
              <div className={styles.circleProgressWrap}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={theme.primary}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - (questions.length - essayCount > 0 ? correctCount / (questions.length - essayCount) : 1))}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800">
                    {questions.length - essayCount > 0 ? Math.round((correctCount / (questions.length - essayCount)) * 100) : 100}%
                  </text>
                </svg>
              </div>

              <h2 className={styles.resultTitle}>Test Completed!</h2>
              <p className={styles.resultDesc}>You have finished reviewing all question sets in the {sectionTitle} module.</p>

              <div className={styles.statsGrid}>
                {questions.length - essayCount > 0 && (
                  <>
                    <div className={styles.statItem}>
                      <span className={styles.statVal} style={{ color: theme.primary }}>{correctCount}</span>
                      <span className={styles.statLbl}>Correct Answers</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statVal} style={{ color: "#ef4444" }}>{(questions.length - essayCount) - correctCount}</span>
                      <span className={styles.statLbl}>Incorrect Answers</span>
                    </div>
                  </>
                )}
                {essayCount > 0 && (
                  <div className={styles.statItem}>
                    <span className={styles.statVal} style={{ color: theme.primary }}>{Object.keys(essayResponses).length}</span>
                    <span className={styles.statLbl}>Essays Completed</span>
                  </div>
                )}
              </div>

              <div className={styles.reviewList}>
                <h3>Review Solutions</h3>
                {questions.map((q, idx) => (
                  <div key={q.id} className={styles.reviewCard}>
                    <p className={styles.reviewPrompt}><strong>Q{idx + 1}:</strong> {q.prompt}</p>
                    {q.type !== "essay" ? (
                      <p className={styles.reviewVerdict}>
                        Your Answer: <strong style={{ color: userAnswers[q.id] === q.correctAnswer ? theme.primary : "#ef4444" }}>{userAnswers[q.id] || "Skipped"}</strong> | Correct: <strong>{q.correctAnswer}</strong>
                      </p>
                    ) : (
                      <p className={styles.reviewVerdict}>
                        Written Response Recorded (Word Count: {essayResponses[q.id]?.split(/\s+/).filter(Boolean).length || 0})
                      </p>
                    )}
                    <div className={styles.reviewExplanation}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={onBack} className={styles.doneBtn} style={{ background: theme.primary }}>
                Back to Dashboard
              </button>
            </div>
          ) : (
            /* QUESTION DISPLAY */
            <div className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionProgress}>
                  Question {currentIdx + 1} of {questions.length}
                </span>
                {currentQ.type === "essay" && (
                  <span className={styles.essayBadge} style={{ background: theme.glow, color: theme.primary }}>
                    Essay Prompt
                  </span>
                )}
              </div>

              <h2 className={styles.questionPrompt}>{currentQ.prompt}</h2>

              {/* Options or Essay inputs */}
              {!isEssay ? (
                <div className={styles.optionsList}>
                  {currentQ.options?.map((option) => {
                    const isSelected = selectedOption === option;
                    let optionStyle = styles.optionBtn;
                    if (isSelected) optionStyle += ` ${styles.optionSelected}`;
                    if (isQuestionSubmitted) {
                      if (option === currentQ.correctAnswer) optionStyle += ` ${styles.optionCorrect}`;
                      else if (isSelected) optionStyle += ` ${styles.optionIncorrect}`;
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(currentQ.id, option)}
                        className={optionStyle}
                        disabled={isQuestionSubmitted}
                        style={isSelected && !isQuestionSubmitted ? { borderColor: theme.primary } : {}}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.essayInputWrap}>
                  <textarea
                    className={styles.essayTextarea}
                    placeholder="Type your response here..."
                    value={writtenText}
                    onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                    disabled={isQuestionSubmitted}
                  />
                  <div className={styles.wordCount}>
                    Word Count: {writtenText.split(/\s+/).filter(Boolean).length}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className={styles.actionButtons}>
                {!isQuestionSubmitted ? (
                  <button
                    onClick={() => handleSubmitQuestion(currentQ.id)}
                    className={styles.submitBtn}
                    style={{ background: theme.primary }}
                    disabled={!selectedOption && !writtenText}
                  >
                    Confirm Answer
                  </button>
                ) : (
                  <div className={styles.explanationCard} style={{ borderColor: theme.primary, background: theme.glow }}>
                    <h4 style={{ color: theme.primary }}>💡 Solution & Explanation</h4>
                    {!isEssay && (
                      <p>
                        Correct Answer: <strong>{currentQ.correctAnswer}</strong>
                      </p>
                    )}
                    <p className={styles.explanationText}>{currentQ.explanation}</p>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className={styles.navRow}>
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => i - 1)}
                  className={styles.prevBtn}
                >
                  Previous
                </button>
                <button
                  disabled={currentIdx === questions.length - 1}
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className={styles.nextBtn}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
