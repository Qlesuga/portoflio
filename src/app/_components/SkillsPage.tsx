import { useTranslation } from "react-i18next";
import "./skillsPage.css";

interface Circle {
  translationKey: string;
  color: string;
  radius: number;
  skills: string[];
}

const Circles: Circle[] = [
  {
    translationKey: "skills.proficient",
    color: "220, 38, 38",
    radius: 100,
    skills: ["TypeScript", "JavaScript", "Python"],
  },
  {
    translationKey: "skills.familiar",
    color: "37, 99, 235",
    radius: 165,
    skills: ["C", "C#", "Kotlin", "Zig", "Rust"],
  },
  {
    translationKey: "skills.libaries",
    color: "5, 150, 105",
    radius: 230,
    skills: ["React", "Node.js", "Flask", "FastAPI", "NextJS", "Tailwind"],
  },
  {
    translationKey: "skills.tools",
    color: "109, 40, 217",
    radius: 295,
    skills: ["Git", "Docker", "Redis", "MongoDB", "PGSQL", "Linux", "Prisma"],
  },
];

const BALL_SIZE = 54;

export default function SkillsPage() {
  const { t } = useTranslation();
  const getFontSize = (text: string) => {
    if (text.length <= 5) return "0.9rem";
    if (text.length <= 8) return "0.7rem";
    if (text.length <= 12) return "0.55rem";
    return "0.6rem";
  };

  function calculateBallPositions(
    Amount: number,
    index: number,
    radius: number,
  ) {
    const theta = (2 * Math.PI * index) / Amount;
    const x = radius + radius * Math.cos(theta);
    const y = radius + radius * Math.sin(theta);
    return { x: x, y: y };
  }

  const BALL_ORBIT_SPEED = 0.1;
  const calculateSpinSpeed = (radius: number) => {
    return (2 * Math.PI * radius) / 100 / BALL_ORBIT_SPEED;
  };

  return (
    <div
      className="skills-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 730,
        padding: "0 16px",
        borderRadius: "0 0 9px 9px",
        fontFamily: "var(--font-roboto)",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <h1 className="text-4xl">{t("skills.title")}</h1>
      <div
        style={{
          width: 1180,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
            width: 500,
          }}
        >
          {Circles.map((circle) => (
            <div
              key={circle.translationKey}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "12px",
                width: 500,
                boxSizing: "border-box",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${circle.color}, 0.1)`;
                e.currentTarget.style.borderColor = `rgba(${circle.color}, 0.3)`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: `rgb(${circle.color})`,
                  boxShadow: `0 0 10px rgba(${circle.color}, 0.5)`,
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    marginTop: 0,
                    marginBottom: "0.25rem",
                    color: "#fff",
                  }}
                >
                  {t(`${circle.translationKey}.title`)}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#aaa",
                    lineHeight: "1.4",
                    marginBottom: "0.5rem",
                  }}
                >
                  {t(`${circle.translationKey}.description`)}
                </p>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                  }}
                >
                  {circle.skills.length} skill
                  {circle.skills.length > 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: 670,
            height: 670,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {Circles.map((circle, i) => {
            const rotationSpeed = calculateSpinSpeed(circle.radius);
            const orbitSpeed = rotationSpeed * 1.25;
            return (
              <div
                key={`circle-${i}`}
                style={{
                  borderRadius: "100%",
                  height: circle.radius * 2,
                  width: circle.radius * 2,
                  boxSizing: "border-box",
                  position: "absolute",
                  animation: `${i % 2 == 0 ? "spin-reverse" : "spin"} ${rotationSpeed}s linear infinite`,
                }}
              >
                <div
                  key={`orbit-{i}`}
                  style={{
                    borderRadius: "100%",

                    height: circle.radius * 2,
                    width: circle.radius * 2,
                    border: `2px rgba(${circle.color},0.3) dashed`,
                    boxSizing: "border-box",
                    position: "absolute",
                    animation: `${i % 2 == 0 ? "spin" : "spin-reverse"} ${orbitSpeed}s linear infinite`,
                  }}
                />
                {circle.skills.map((skill, j) => {
                  const { x, y } = calculateBallPositions(
                    circle.skills.length,
                    j,
                    circle.radius,
                  );
                  return (
                    <div
                      key={`ball-${i}-${j}`}
                      style={{
                        borderRadius: "100%",
                        position: "absolute",
                        left: x - BALL_SIZE / 2,
                        top: y - BALL_SIZE / 2,
                        width: BALL_SIZE,
                        height: BALL_SIZE,
                        fontSize: getFontSize(skill),
                        textShadow:
                          "0 1px 3px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)",
                        fontWeight: "700",
                        backgroundColor: `rgb(${circle.color})`,
                        boxShadow: `0 0 20px rgba(${circle.color}, 0.5)`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        flexDirection: "column",
                        animation: `${i % 2 == 0 ? "spin" : "spin-reverse"} ${rotationSpeed}s linear infinite`,
                      }}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              border: "1px #dd3300 solid",
              background:
                "radial-gradient(circle, #ff6b35 0%,#FFD700 10%, #ff4500 40%, #cc3300 100%",
              boxShadow: "0 0 25px #ff6b35, inset 0 0 50px #cc3300",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "repeating-conic-gradient(from 0deg, transparent 0deg, rgba(255,107,53,0.3) 10deg, transparent 20deg)",
                animation: "spin 80s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgb(204, 51, 0) 0%, rgba(255,215,0,0.8) 30%, rgba(255,140,0,0.4) 50%, transparent 100%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(255,255,255,0.8)",
                fontSize: "16px",
              }}
            >
              Programmer
              <br />
              Core
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
