import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type ProjectInfo = {
  name: string;
  shortDescription: string;
  description: string;
  techStack: { name: string; color: string }[];
  information: { category: string; value: string | React.ReactNode }[];
  images: string[];
};

type ProjectID = "familylynk" | "jajowall";

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
        category: "website link",
        value: (
          <a
            style={{ textDecoration: "underline" }}
            href="https://hakhiros.vercel.app/"
          >
            hakhiros.vercel.app
          </a>
        ),
      },
      {
        category: "source code",
        value: (
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/Yndh/FamiLynk"
          >
            github.com/Yndh/FamiLynk
          </a>
        ),
      },
      {
        category: "started",
        value: "2023",
      },
      {
        category: "ended",
        value: "2023",
      },
      {
        category: "team size",
        value: "4",
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
    images: [
      "/familylynk/image1.png",
      "/familylynk/image2.png",
      "/familylynk/image3.png",
      "/familylynk/image4.png",
      "/familylynk/image5.png",
    ],
  },
  jajowall: {
    name: "JajoWall",
    shortDescription: "wallpaper manipulator",
    description:
      "JajoWall is simple wallpaper manager that allows user to set .mp4/.gif files as wallpaper with audio support. Nothing more, nothing less",
    information: [
      {
        category: "status",
        value: "Archived",
      },
      {
        category: "type",
        value: "Desktop Application",
      },
      {
        category: "source code",
        value: (
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/Qlesuga/jajowall"
          >
            github.com/Qlesuga/jajowall
          </a>
        ),
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
      { name: "python", color: "220, 38, 38" },
      { name: "PyQt6", color: "5, 150, 105" },
      { name: "windowsAPI", color: "5, 150, 105" },
      { name: "pywin32", color: "5, 150, 105" },
      { name: "opencv", color: "5, 150, 105" },
    ],
    images: ["/jajowall.gif"],
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
        height: "650px",
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
          width: "325px",
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
        {project.images.length == 1 ? (
          <Image
            src={project.images[0] ?? ""}
            layout="responsive"
            height={50}
            width={50}
            alt="image"
          />
        ) : (
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            style={{ height: 170 }}
          >
            <CarouselContent>
              {project.images.map((image) => {
                return (
                  <CarouselItem key={image}>
                    <Image
                      src={image}
                      layout="responsive"
                      height={50}
                      width={50}
                      alt="image"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              style={{ marginLeft: 30, backgroundColor: "#222" }}
            />
            <CarouselNext
              style={{ marginRight: 30, backgroundColor: "#222" }}
            />
          </Carousel>
        )}
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

      <div style={{ borderBottom: "1px solid #a2a9b1", paddingBottom: 12 }}>
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
