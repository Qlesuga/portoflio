import "./skillsPage.css";

const Circles = [
  {
    amount: 5,
    color: "red",
    radius: 200,
  },
  {
    amount: 3,
    color: "blue",
    radius: 150,
  },
  {
    amount: 2,
    color: "green",
    radius: 50,
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
          return (
            <div
              className="ball"
              style={{
                height: circle.radius * 2,
                width: circle.radius * 2,
                border: `3px ${circle.color} solid`,
                boxSizing: "border-box",
                position: "absolute",
                animation: `${i % 2 == 0 ? "spin-reverse" : "spin"} 5s linear infinite`,
              }}
            >
              {[...Array(circle.amount)].map((_, j) => {
                const [x, y] = calculateBallPositions(
                  circle.amount,
                  j,
                  circle.radius,
                );
                return (
                  <div
                    key={`${circle.color}-${j}`}
                    className="ball"
                    style={{
                      position: "absolute",
                      left: x - 20,
                      top: y - 20,
                      width: 40,
                      height: 40,
                      backgroundColor: circle.color,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
