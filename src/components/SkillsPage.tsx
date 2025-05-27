import "./skillsPage.css";

interface Circle {
  title: string;
  color: string;
  radius: number;
  skills: string[];
}

const Circles: Circle[] = [
  {
    title: "Proficient Programming Languages",
    color: "239, 68, 68",
    radius: 100,
    skills: ["Typescript", "Javascript", "Python"],
  },
  {
    title: "Familiar Programming Languages",
    color: "59, 130, 246",
    radius: 150,
    skills: ["C", "C#", "Kotlin", "Zig", "Rust"],
  },
  {
    title: "Libraries/Frameworks",
    color: "16, 185, 129",
    radius: 200,
    skills: ["React", "Node.js", "Flask", "FastAPI", "NextJS", "Tailwind"],
  },
  {
    title: "Software/Tools",
    color: "139, 92, 246",
    radius: 250,
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Redis",
      "MongoDB",
      "PostgreSQL",
      "MS SQL",
      "Figma",
      "Linux",
      "Prisma",
    ],
  },
];

export default function SkillsPage() {
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

  const BALL_ORBIT_SPEED = 0.3;
  const calculateSpinSpeed = (radius: number) => {
    return (2 * Math.PI * radius) / 100 / BALL_ORBIT_SPEED;
  };

  return (
    <div
      className="skills-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="skills-title" style={{ marginBottom: 0 }}>
        Skills
      </h1>
      <div
        style={{
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Circles.map((circle) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  width: 250,
                }}
                key={circle.title}
              >
                <div
                  className="ball"
                  style={{
                    width: 12,
                    height: 12,
                    background: `rgb(${circle.color})`,
                  }}
                />
                <p style={{ width: "calc(100% - 20px)" }}>{circle.title}</p>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: 600,
            height: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
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
                {circle.skills.map((ball, j) => {
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
                        left: x - 20,
                        top: y - 20,
                        width: 40,
                        height: 40,
                        backgroundColor: `rgb(${circle.color})`,
                        boxShadow: `0 0 20px rgba(${circle.color}, 0.5)`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        animation: `${i % 2 == 0 ? "spin" : "spin-reverse"} ${rotationSpeed}s linear infinite`,
                      }}
                    >
                      {ball}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div
            style={{
              width: "120px",
              height: "120px",
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
