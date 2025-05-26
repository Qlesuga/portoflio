import "./skillsPage.css";

const Balls = [
  {
    amount: 5,
    color: "red",
    radrius: 200,
  },
  {
    amount: 3,
    color: "blue",
    raddius: 150,
  },
];

export default function SkillsPage() {
  const calculateBallPositions = (Amount: number, index: number) => {
    const theta = (2 * Math.PI * index) / Amount;
    const x = 200 + 200 * Math.cos(theta);
    const y = 200 + 200 * Math.sin(theta);
    return [x, y];
  };
  const N = 5;
  return (
    <div className="skills-container">
      <h1 className="skills-title">Skills</h1>
      <div
        className="ball"
        style={{
          height: 400,
          width: 400,
          border: "3px red solid",
          boxSizing: "border-box",
          position: "absolute",
          marginLeft: 50,
        }}
      >
        {[...Array(N)].map((_, i) => {
          const [x, y] = calculateBallPositions(N, i);
          console.log(`Ball ${i}: x=${x}, y=${y}`);
          return (
            <div
              key={`${x}-${y}`}
              className="ball"
              style={{
                position: "absolute",
                left: x - 20,
                top: y - 20,
                width: 40,
                height: 40,
                backgroundColor: "red",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
