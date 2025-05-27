import "./skillsPage.css";

const Circles = [
  {
    title: "Proficient Programming Languages",
    color: "red",
    radius: 100,
    skills: ["Typescript", "Javascript", "Python"],
  },
  {
    title: "Familiar Programming Languages",
    color: "blue",
    radius: 150,
    skills: ["C", "C#", "Kotlin", "Zig", "Rust"],
  },
  {
    title: "Libraries/Frameworks",
    color: "green",
    radius: 200,
    skills: ["React", "Node.js", "Flask", "FastAPI", "NextJS", "Tailwind"],
  },
  {
    title: "Software/Tools",
    color: "purple",
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

  const ROTATE_SPEED = 2;
  const calculateSpinSpeed = (radius: number) => {
    return (2 * Math.PI * radius) / 100 / ROTATE_SPEED;
  };

  return (
    <div className="skills-container">
      <h1 className="skills-title">Skills</h1>
      <div
        style={{
          width: 500,
          height: 500,
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
                border: `3px ${circle.color} solid`,
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
                      backgroundColor: circle.color,
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
