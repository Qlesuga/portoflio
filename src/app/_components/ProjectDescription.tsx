import Image from "next/image";

type ProjectInfo = {
  name: string;
  shortDescription: string;
  description: string;
  techStack: { name: string; color: string }[];
  information: { category: string; value: string }[];
  images: string[];
};

type ProjectID = "familylynk";

const Projects: Record<ProjectID, ProjectInfo> = {
  familylynk: {
    name: "Familylynk",
    shortDescription: "family organization app",
    description:
      "FamiLynk is a web application built with Next.js and TypeScript that helps organize family life. The app allows family members to share various types of information, such as calendars, notes, chores, and recipes.",
    information: [
      {
        category: "status",
        value: "Maintenance",
      },
      {
        category: "type",
        value: "Web Application",
      },
      {
        category: "started",
        value: "2023",
      },
      {
        category: "ended",
        value: "2023",
      },
    ],
    techStack: [
      { name: "TypeScript", color: "220, 38, 38" },
      { name: "Next.js", color: "5, 150, 105" },
      { name: "Prisma", color: "5, 150, 105" },
      { name: "next-auth", color: "5, 150, 105" },
      { name: "FontAwesome", color: "5, 150, 105" },
      { name: "FullCalendar", color: "5, 150, 105" },
      { name: "bcrypt", color: "5, 150, 105" },
      { name: "react-qr-code", color: "5, 150, 105" },
      { name: "react-toastify", color: "5, 150, 105" },
      { name: "Docker", color: "109, 40, 217" },
    ],
    images: ["familylynk/image1"],
  },
};

interface ProjectDescription {
  projectID: ProjectID;
}

export default function ProjectDescription({ projectID }: ProjectDescription) {
  const project = Projects[projectID];

  return (
    <div
      style={{
        lineHeight: "1.6",
        padding: "16px",
        paddingTop: 4,
        height: "550px",
        width: "1000px",
        overflow: "scroll",
        borderRadius: "0 0 9px 9px",
        color: "white",
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5em",
            fontWeight: "normal",
            margin: 0,
          }}
        >
          {project.name}
        </h1>
        <p
          style={{
            fontSize: "1.1em",
            color: "#888",
            margin: 0,
            marginTop: -8,
            fontStyle: "italic",
            borderBottom: "1px solid #a2a9b1",
          }}
        >
          {project.shortDescription}
        </p>
      </div>

      <div
        style={{
          float: "right",
          width: "300px",
          backgroundColor: "#333",
          border: "1px solid #a2a9b1",
          margin: "0 0 20px 20px",
          padding: "20px",
          fontSize: "0.9em",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            backgroundColor: "#222",
            margin: "-20px -20px 15px -20px",
            padding: "10px",
            fontSize: "1.1em",
            borderBottom: "1px solid #a2a9b1",
          }}
        >
          Project Information
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <button
            style={{
              borderRadius: 100,
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "white",
              border: "1px solid rgba(0,0,0,0.5)",
              padding: "0 4px",
            }}
          >
            {"<"}
          </button>
          <Image
            src="/familylynk/image1.png"
            layout="responsive"
            height={50}
            width={50}
            alt="image"
          />
          <button
            style={{
              borderRadius: 100,
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "white",
              border: "1px solid rgba(0,0,0,0.5)",
              padding: "0 4px",
            }}
          >
            {">"}
          </button>
        </div>
        <div style={{ marginTop: 4 }}>
          {project.information.map((info) => {
            return (
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "5px",
                }}
                key={info.category}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    width: "100px",
                    flexShrink: 0,
                  }}
                >
                  {info.category}
                </div>
                <div>{info.value}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderBottom: "1px solid #a2a9b1" }}>
        <p>{project.description}</p>
      </div>
      <div>
        <h3
          style={{
            fontSize: "1.3em",
            margin: "5px 0 5px 0",
          }}
        >
          Technology Stack
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            margin: "15px 0",
          }}
        >
          {project.techStack.map((technology) => (
            <span
              style={{
                backgroundColor: `rgba(${technology.color},0.4)`,
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "0.9em",
                border: `1px solid rgba(${technology.color},0.8)`,
              }}
              key={technology.name}
            >
              {technology.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
