import "./skillsPage.css";

const Balls = [
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
        {Balls.map((ball, i) => {
          return (
            <div
              className="ball"
              style={{
                height: ball.radius * 2,
                width: ball.radius * 2,
                border: `3px ${ball.color} solid`,
                boxSizing: "border-box",
                position: "absolute",
                animation: `${i % 2 == 0 ? "spin-reverse" : "spin"} 5s linear infinite`,
              }}
            >
              {[...Array(ball.amount)].map((_, j) => {
                const [x, y] = calculateBallPositions(
                  ball.amount,
                  j,
                  ball.radius,
                );
                return (
                  <div
                    key={`${ball.color}-${j}`}
                    className="ball"
                    style={{
                      position: "absolute",
                      left: x - 20,
                      top: y - 20,
                      width: 40,
                      height: 40,
                      backgroundColor: ball.color,
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
