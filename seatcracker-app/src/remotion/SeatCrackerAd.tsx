import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type SeatCrackerAdProps = {
  variant: "short" | "long";
};

type Scene = {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent: string;
  bullets: string[];
  metric: string;
  metricLabel: string;
  image: string;
  tone: string;
};

const thumbnailScene: Scene = {
  eyebrow: "JEE Advanced final 7 days",
  title: "Best 7-day mock preparation plan.",
  subtitle: "Do not just write mocks. Use every paper to discover, correct, and improve before exam day.",
  accent: "#facc15",
  bullets: ["Paper 1 -> analysis", "Paper 2 -> correction", "Daily improvement"],
  metric: "7",
  metricLabel: "days of focused mocks",
  image: "assets/jee_adv_ui/login/login.png",
  tone: "#facc15",
};

const shortScenes: Scene[] = [
  thumbnailScene,
  {
    eyebrow: "Professor's last-week rule: points 1 and 2",
    title: "First diagnose. Then fix what can actually move marks.",
    subtitle: "In the last 7 days, a topper does not chase the whole syllabus. They find mark leaks and repair the highest-return gaps first.",
    accent: "#38bdf8",
    bullets: ["1. Diagnose marks leakage", "2. Repair high-yield weak chapters"],
    metric: "2",
    metricLabel: "moves before Paper 2",
    image: "roadmap-bg.png",
    tone: "#38bdf8",
  },
  {
    eyebrow: "Professor's last-week rule: points 3 and 4",
    title: "Use Paper 2 to correct strategy, then build confidence daily.",
    subtitle: "The student mind needs proof. Every day should show one visible improvement in accuracy, time, or question selection.",
    accent: "#4ade80",
    bullets: ["3. Correct Paper 2 strategy", "4. Track one daily improvement"],
    metric: "4",
    metricLabel: "final-week principles",
    image: "roadmap-bg-simple.png",
    tone: "#22c55e",
  },
  {
    eyebrow: "JEE Advanced is in 7 days",
    title: "One week. Two papers. No blind practice.",
    subtitle: "SeatCracker helps you use every attempt to find what is missing before the next paper.",
    accent: "#38bdf8",
    bullets: ["Paper 1 attempt", "Gap analysis", "Paper 2 correction"],
    metric: "7",
    metricLabel: "days left to sharpen",
    image: "assets/jee_adv_ui/login/login.png",
    tone: "#38bdf8",
  },
  {
    eyebrow: "Day 1: Attempt Paper 1",
    title: "Find the exact marks you are leaking.",
    subtitle: "Take a serious JEE Advanced style paper and let every wrong answer point to a fix.",
    accent: "#facc15",
    bullets: ["Time pressure", "Negative marking awareness", "Question-level review"],
    metric: "P1",
    metricLabel: "first attempt diagnosis",
    image: "assets/jee_adv_ui/login/inst1.png",
    tone: "#f59e0b",
  },
  {
    eyebrow: "After Paper 1",
    title: "Analyze what went wrong before you repeat it.",
    subtitle: "Spot weak chapters, silly errors, skipped concepts, and time traps while they are still fixable.",
    accent: "#fb7185",
    bullets: ["Weak topic map", "Accuracy check", "Time-loss pattern"],
    metric: "Fix",
    metricLabel: "before Paper 2",
    image: "roadmap-bg.png",
    tone: "#ef4444",
  },
  {
    eyebrow: "Then Paper 2",
    title: "Rectify in the next attempt.",
    subtitle: "Practice the exact missing areas, then test again so the second paper becomes smarter than the first.",
    accent: "#22d3ee",
    bullets: ["Targeted revision", "Second-paper strategy", "Mistake reduction"],
    metric: "P2",
    metricLabel: "corrected attempt",
    image: "assets/jee_adv_ui/login/inst2.png",
    tone: "#06b6d4",
  },
  {
    eyebrow: "Next day, improve again",
    title: "Repeat the loop until exam day.",
    subtitle: "Attempt, analyze, rectify, improve. Seven focused days can change how calm you feel in the hall.",
    accent: "#4ade80",
    bullets: ["Daily progress", "Chapter priority", "Confidence building"],
    metric: "+",
    metricLabel: "better each day",
    image: "roadmap-bg-simple.png",
    tone: "#22c55e",
  },
  {
    eyebrow: "SeatCracker JEE Advanced",
    title: "Make the last 7 days hands-on.",
    subtitle: "Use full-paper practice and analysis to enter JEE Advanced with a cleaner plan.",
    accent: "#c084fc",
    bullets: ["Full papers", "Analysis", "Final-week practice"],
    metric: "Rs 39",
    metricLabel: "1 year access",
    image: "intro_bg.png",
    tone: "#a855f7",
  },
];

const longExtraScenes: Scene[] = [
  {
    eyebrow: "Final-week roadmap",
    title: "Do not revise everything. Revise what matters next.",
    subtitle: "After each attempt, turn the analysis into the next day's priority list.",
    accent: "#60a5fa",
    bullets: ["High-impact topics", "Paper-wise priority", "Daily correction"],
    metric: "Plan",
    metricLabel: "from real attempts",
    image: "assets/images/path_background_new.png",
    tone: "#3b82f6",
  },
  {
    eyebrow: "For serious JEE Advanced practice",
    title: "Unlock full-paper practice without wasting the week.",
    subtitle: "Use the remaining days on attempts, analysis, and corrections instead of wondering what to do.",
    accent: "#f472b6",
    bullets: ["Paper 1 + Paper 2", "Rank analysis", "One-time payment"],
    metric: "Rs 39",
    metricLabel: "JEE Advanced access",
    image: "assets/jee_adv_ui/login/login.png",
    tone: "#ec4899",
  },
];

const getScenes = (variant: SeatCrackerAdProps["variant"]) =>
  variant === "short"
    ? shortScenes
    : [
        shortScenes[0],
        shortScenes[1],
        longExtraScenes[0],
        shortScenes[2],
        shortScenes[3],
        shortScenes[4],
        longExtraScenes[1],
        shortScenes[5],
      ];

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const fontFamily =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

const seconds = (value: number, fps: number) => Math.round(value * fps);

const SceneCard = ({
  scene,
  duration,
  index,
}: {
  scene: Scene;
  duration: number;
  index: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 110, mass: 0.85 },
  });
  const exit = interpolate(frame, [duration - seconds(1, fps), duration], [1, 0], clamp);
  const progress = interpolate(frame, [0, duration], [0, 1], clamp);
  const slide = interpolate(enter, [0, 1], [70, 0]);
  const imageScale = interpolate(progress, [0, 1], [1.05, 1.18], clamp);
  const glowX = interpolate(progress, [0, 1], [-220, 220], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "#050816",
        color: "white",
        fontFamily,
        opacity: exit,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(scene.image)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.24,
          transform: `scale(${imageScale}) translateX(${index % 2 === 0 ? -progress * 28 : progress * 28}px)`,
          filter: "saturate(1.15) contrast(1.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,8,22,0.96) 0%, rgba(5,8,22,0.82) 48%, rgba(5,8,22,0.34) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: 520,
          left: 1180 + glowX,
          top: 70,
          background: scene.tone,
          opacity: 0.18,
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 70,
          right: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: interpolate(frame, [0, 18], [0, 1], clamp),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Img src={staticFile("logo.png")} style={{ width: 70, height: 70, objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 0 }}>SeatCracker</div>
            <div style={{ color: "#94a3b8", fontSize: 17, fontWeight: 700 }}>
              JEE Advanced final-week practice
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 999,
            padding: "13px 22px",
            color: "#dbeafe",
            background: "rgba(15,23,42,0.55)",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          seatcracker.com
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 116,
          top: 220,
          width: 980,
          transform: `translateY(${slide}px)`,
          opacity: enter,
        }}
      >
        <div
          style={{
            color: scene.accent,
            textTransform: "uppercase",
            fontSize: 23,
            fontWeight: 900,
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          {scene.eyebrow}
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 0.98,
            fontWeight: 950,
            letterSpacing: 0,
            maxWidth: 980,
            textWrap: "balance",
          }}
        >
          {scene.title}
        </div>
        <div
          style={{
            marginTop: 34,
            maxWidth: 760,
            color: "#cbd5e1",
            fontSize: 34,
            lineHeight: 1.25,
            fontWeight: 650,
          }}
        >
          {scene.subtitle}
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 42, flexWrap: "wrap" }}>
          {scene.bullets.map((bullet, bulletIndex) => {
            const bulletIn = interpolate(
              frame,
              [seconds(0.45 + bulletIndex * 0.14, fps), seconds(0.8 + bulletIndex * 0.14, fps)],
              [0, 1],
              clamp,
            );
            return (
              <div
                key={bullet}
                style={{
                  opacity: bulletIn,
                  transform: `translateY(${interpolate(bulletIn, [0, 1], [20, 0])}px)`,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(15,23,42,0.68)",
                  borderRadius: 8,
                  padding: "15px 19px",
                  color: "#f8fafc",
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {bullet}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 126,
          bottom: 116,
          width: 500,
          height: 310,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(2,6,23,0.74)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
          padding: 34,
          opacity: interpolate(frame, [seconds(0.25, fps), seconds(0.85, fps)], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [0, seconds(0.9, fps)], [50, 0], clamp)}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 30 }}>
          <div style={{ color: "#94a3b8", fontSize: 18, fontWeight: 800 }}>Final-week signal</div>
          <div style={{ width: 13, height: 13, borderRadius: 13, background: scene.accent }} />
        </div>
        <div style={{ fontSize: 86, fontWeight: 950, lineHeight: 1, color: scene.accent }}>
          {scene.metric}
        </div>
        <div style={{ color: "#e2e8f0", fontSize: 26, fontWeight: 850, marginTop: 10 }}>
          {scene.metricLabel}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 36 }}>
          {[0.45, 0.72, 0.58].map((bar, barIndex) => (
            <div
              key={barIndex}
              style={{
                height: 76,
                borderRadius: 6,
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "end",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${interpolate(frame, [10, 45], [12, bar * 100], clamp)}%`,
                  background: `linear-gradient(180deg, ${scene.accent}, rgba(255,255,255,0.2))`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ClosingOverlay = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.94, 1.02]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        background:
          "radial-gradient(circle at 50% 42%, rgba(56,189,248,0.2), transparent 34%), linear-gradient(135deg, #020617, #111827 48%, #260f3f)",
        color: "white",
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 155,
          height: 155,
          objectFit: "contain",
          marginBottom: 30,
          transform: `scale(${pulse})`,
        }}
      />
      <div
        style={{
          fontSize: 112,
          lineHeight: 1,
          fontWeight: 950,
          letterSpacing: 0,
          textAlign: "center",
        }}
      >
        SeatCracker
      </div>
      <div
        style={{
          marginTop: 28,
          color: "#dbeafe",
          fontSize: 38,
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        Attempt. Analyze. Rectify. Improve before JEE Advanced.
      </div>
      <div
        style={{
          marginTop: 54,
          borderRadius: 8,
          padding: "22px 34px",
          background: "#ffffff",
          color: "#020617",
          fontSize: 31,
          fontWeight: 950,
        }}
      >
        Visit seatcracker.com and start today
      </div>
    </AbsoluteFill>
  );
};

export const SeatCrackerThumbnail = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#020617",
        color: "white",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("assets/jee_adv_ui/login/login.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.18,
          filter: "saturate(1.2) contrast(1.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.86) 48%, rgba(2,6,23,0.42) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 94,
          top: 70,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Img src={staticFile("logo.png")} style={{ width: 78, height: 78, objectFit: "contain" }} />
        <div>
          <div style={{ fontSize: 34, fontWeight: 950 }}>SeatCracker</div>
          <div style={{ color: "#bfdbfe", fontSize: 20, fontWeight: 800 }}>JEE Advanced mock preparation</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 106,
          top: 216,
          width: 1050,
        }}
      >
        <div
          style={{
            color: "#facc15",
            fontSize: 34,
            fontWeight: 950,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          JEE Advanced in 7 days
        </div>
        <div
          style={{
            fontSize: 118,
            lineHeight: 0.94,
            fontWeight: 950,
            letterSpacing: 0,
            textWrap: "balance",
          }}
        >
          Best 7-day mock preparation plan
        </div>
        <div
          style={{
            marginTop: 34,
            color: "#dbeafe",
            fontSize: 38,
            lineHeight: 1.2,
            fontWeight: 800,
            maxWidth: 820,
          }}
        >
          Attempt. Analyze. Rectify. Improve before the real exam.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 118,
          bottom: 114,
          width: 520,
          borderRadius: 8,
          background: "rgba(15,23,42,0.86)",
          border: "1px solid rgba(250,204,21,0.35)",
          padding: "36px 40px",
          boxShadow: "0 30px 100px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ color: "#facc15", fontSize: 92, lineHeight: 1, fontWeight: 950 }}>7 DAYS</div>
        <div style={{ marginTop: 16, color: "#f8fafc", fontSize: 34, lineHeight: 1.12, fontWeight: 900 }}>
          Mock practice that tells you what to fix next
        </div>
        <div
          style={{
            marginTop: 28,
            display: "inline-flex",
            borderRadius: 8,
            background: "#ffffff",
            color: "#020617",
            padding: "14px 20px",
            fontSize: 24,
            fontWeight: 950,
          }}
        >
          seatcracker.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SeatCrackerAd = ({ variant }: SeatCrackerAdProps) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const scenes = getScenes(variant);
  const closingDuration = seconds(variant === "short" ? 7 : 15, fps);
  const sceneDuration = Math.floor((durationInFrames - closingDuration) / scenes.length);
  const progressWidth = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ background: "#020617" }}>
      {scenes.map((scene, index) => (
        <Sequence key={`${scene.title}-${index}`} from={index * sceneDuration} durationInFrames={sceneDuration}>
          <SceneCard scene={scene} duration={sceneDuration} index={index} />
        </Sequence>
      ))}
      <Sequence from={scenes.length * sceneDuration} durationInFrames={closingDuration}>
        <ClosingOverlay />
      </Sequence>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 7,
          width: `${progressWidth}%`,
          background: "linear-gradient(90deg, #38bdf8, #facc15, #fb7185, #4ade80, #c084fc)",
        }}
      />
    </AbsoluteFill>
  );
};
