import "./skillsPage.css";

interface Circle {
  title: string;
  description: string;
  color: string;
  radius: number;
  skills: string[];
}

const Circles: Circle[] = [
  {
    title: "Proficient Programming Languages",
    description:
      "Languages I've used in larger projects with hands-on experience",
    color: "220, 38, 38",
    radius: 100,
    skills: ["Typescript", "Javascript", "Python"],
  },
  {
    title: "Familiar Programming Languages",
    description: "Languages I’ve played around with in smaller projects",
    color: "37, 99, 235",
    radius: 165,
    skills: ["C", "C#", "Kotlin", "Zig", "Rust"],
  },
  {
    title: "Libraries/Frameworks",
    description:
      "Stuff I use to build things on the web—front-end, back-end, styling, you name it",
    color: "5, 150, 105",
    radius: 230,
    skills: ["React", "Node.js", "Flask", "FastAPI", "NextJS", "Tailwind"],
  },
  {
    title: "Software/Tools",
    description:
      "Tools I use all the time—whether it’s for coding, designing, running apps, or managing data",
    color: "109, 40, 217",
    radius: 295,
    skills: [
      "Git",
      "Docker",
      "Redis",
      "MongoDB",
      "PGSQL",
      "MSSQL",
      "Figma",
      "Linux",
      "Prisma",
    ],
  },
];

const BALL_SIZE = 54;

export default function SkillsPage() {
  const getFontSize = (text: string) => {
    if (text.length <= 5) return "0.9rem";
    if (text.length <= 8) return "0.7rem";
    if (text.length <= 12) return "0.55rem";
    return "0.6rem";
  };

  const calculateBallPositions = (
    Amount: number,
    index: number,
    radius: number,
  ) => {
    const theta = (2 * Math.PI * index) / Amount;
    const x = radius + radius * Math.cos(theta);
    const y = radius + radius * Math.sin(theta);
    return [x, y];
  };

  const BALL_ORBIT_SPEED = 0.2;
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
      }}
    >
      <h1 className="skills-title" style={{ marginBottom: 0 }}>
        Skills
      </h1>
      <div
        style={{
          minWidth: 1280,
          minHeight: 640,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
            width: 500,
          }}
        >
          {Circles.map((circle) => (
            <div
              key={circle.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "12px",
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
                  {circle.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#aaa",
                    lineHeight: "1.4",
                    marginBottom: "0.5rem",
                  }}
                >
                  {circle.description}
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
            top: -15,
            left: -15,
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
                className="ball"
                style={{
                  height: circle.radius * 2,
                  width: circle.radius * 2,
                  boxSizing: "border-box",
                  position: "absolute",
                  animation: `${i % 2 == 0 ? "spin-reverse" : "spin"} ${rotationSpeed}s linear infinite`,
                }}
              >
                <div
                  key={`orbit-{i}`}
                  className="ball"
                  style={{
                    height: circle.radius * 2,
                    width: circle.radius * 2,
                    border: `2px rgba(${circle.color},0.3) dashed`,
                    boxSizing: "border-box",
                    position: "absolute",
                    animation: `${i % 2 == 0 ? "spin" : "spin-reverse"} ${orbitSpeed}s linear infinite`,
                  }}
                />
                {circle.skills.map((skill, j) => {
                  const [x, y] = calculateBallPositions(
                    circle.skills.length,
                    j,
                    circle.radius,
                  );
                  return (
                    <div
                      key={`ball-${i}-${j}`}
                      className="ball"
                      style={{
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
