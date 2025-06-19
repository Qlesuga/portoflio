import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

type ProjectInfo = {
  name: string;
  shortDescription: string;
  description: string;
  techStack: { name: string; color: string }[];
  information: { category: string; value: string | React.ReactNode }[];
  images: string[];
};

type ProjectID = "familylynk" | "jajowall" | "bajojajosr";

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
      { name: "React", color: "5, 150, 105" },
      { name: "Prisma", color: "5, 150, 105" },
      { name: "next-auth", color: "5, 150, 105" },
      { name: "Docker", color: "109, 40, 217" },
      { name: "PostgreSQL", color: "109, 40, 217" },
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
  bajojajosr: {
    name: "BajoJajo Sr",
    shortDescription: "twitch song request",
    description:
      "BajoJajo SR is a lightweight, open-source Twitch bot designed to handle song requests during livestreams. Built with simplicity and efficiency in mind, it allows both viewers and moderators to manage music playback with a set of easy-to-use chat commands.",
    information: [
      {
        category: "status",
        value: "Developing",
      },
      {
        category: "type",
        value: "Web Application",
      },
      {
        category: "source code",
        value: (
          <a
            style={{ textDecoration: "underline" }}
            href="https://github.com/Qlesuga/BajoJajo_Sr"
          >
            github.com/Qlesuga/bajojajo_sr
          </a>
        ),
      },
      {
        category: "started",
        value: "2025",
      },
    ],
    techStack: [
      { name: "TypeScript", color: "220, 38, 38" },
      { name: "Python", color: "220, 38, 38" },
      { name: "Next.js", color: "5, 150, 105" },
      { name: "FastAPI", color: "5, 150, 105" },
      { name: "React", color: "5, 150, 105" },
      { name: "yt-dlp", color: "5, 150, 105" },
      { name: "Prisma", color: "5, 150, 105" },
      { name: "tRPC", color: "5, 150, 105" },
      { name: "next-auth", color: "5, 150, 105" },
      { name: "Docker", color: "109, 40, 217" },
      { name: "Redis", color: "109, 40, 217" },
      { name: "PostgreSQL", color: "109, 40, 217" },
    ],
    images: [
      "/bajojajosr/image1.png",
      "/bajojajosr/image2.png",
      "/bajojajosr/image3.png",
    ],
  },
};

interface ProjectDescription {
  projectID: ProjectID;
}

export default function ProjectDescription({ projectID }: ProjectDescription) {
  const project = Projects[projectID];
  const [selectedImage, setSelectedImage] = useState<null | number>(null);

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
      {selectedImage != null ? (
        <div
          className="cursor-pointer absolute flex justify-center items-center size-full overflow-y-hidden ml-[-16px] mt-[-4px] z-1"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setSelectedImage(null)}
        >
          {project.images.length == 1 ? (
            /*eslint-disable-next-line @next/next/no-img-element*/
            <img
              src={project.images[selectedImage] ?? ""}
              className="relative w-[85%] cursor-auto"
              alt="image"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            <Carousel
              opts={{
                loop: true,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-[85%] cursor-auto"
              style={{ zIndex: 1 }}
            >
              <CarouselContent>
                {project.images.map((_, i) => {
                  const len = project.images.length;
                  const curr = (i + selectedImage) % len;
                  const image = project.images[curr];
                  return (
                    <CarouselItem key={image}>
                      {/*eslint-disable-next-line @next/next/no-img-element*/}
                      <img src={image} alt="image" />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious
                style={{ backgroundColor: "#222" }}
                className="cursor-pointer"
              />
              <CarouselNext
                style={{ backgroundColor: "#222" }}
                className="cursor-pointer"
              />
            </Carousel>
          )}
        </div>
      ) : (
        ""
      )}

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
          /*eslint-disable-next-line @next/next/no-img-element*/
          <img
            src={project.images[0] ?? ""}
            height={150}
            alt="image"
            onClick={() => {
              setSelectedImage(0);
            }}
            className="cursor-pointer"
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
            style={{ height: 150 }}
          >
            <CarouselContent>
              {project.images.map((image, i) => {
                return (
                  <CarouselItem key={image}>
                    <Image
                      src={image}
                      layout="responsive"
                      height={50}
                      width={50}
                      alt="image"
                      onClick={() => setSelectedImage(i)}
                      className="cursor-pointer"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              style={{ backgroundColor: "#222" }}
              className="cursor-pointer ml-7"
            />
            <CarouselNext
              style={{ backgroundColor: "#222" }}
              className="cursor-pointer mr-7"
            />
          </Carousel>
        )}
        <p className="text-center" style={{ borderBottom: "1px solid #eee" }}>
          Click on image to make it bigger
        </p>
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
