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

  const ROTATE_SPEED = 0.75;
  const calculateSpinSpeed = (radius: number) => {
    return (2 * Math.PI * radius) / 100 / ROTATE_SPEED;
  };

  return (
    <div
      className="skills-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="skills-title">Skills</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
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
              <p>{circle.title}</p>
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
          transform: "rotate(50%)",
        }}
      >
        {Circles.map((circle, i) => {
          const rotationSpeed = calculateSpinSpeed(circle.radius);
          return (
            <div
              key={`circle-${i}`}
              className="ball"
              style={{
                height: circle.radius * 2,
                width: circle.radius * 2,
                border: `2px rgba(${circle.color},0.3) dashed`,
                boxSizing: "border-box",
                position: "absolute",
                animation: `${i % 2 == 0 ? "spin-reverse" : "spin"} ${rotationSpeed}s linear infinite`,
              }}
            >
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
            backgroundColor: "black",
            width: 120,
            height: 120,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Programmer Core
        </div>
      </div>
    </div>
  );
}
