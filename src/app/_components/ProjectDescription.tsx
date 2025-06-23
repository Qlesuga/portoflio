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
import { BajoJajoSr } from "./bajojajoSr/data";
import { FamilyLynkData } from "./familylynk/data";
import { JajoWallData } from "./jajowall/data";

export type ProjectInfo = {
  name: string;
  shortDescription: string;
  description: string;
  techStack: { name: string; color: string }[];
  information: { category: string; value: string | React.ReactNode }[];
  images: string[];
  additionalSections: { title: string; content: string | React.ReactNode }[];
};

type ProjectID = "familylynk" | "jajowall" | "bajojajosr";

const Projects: Record<ProjectID, ProjectInfo> = {
  familylynk: FamilyLynkData,
  jajowall: BajoJajoSr,
  bajojajosr: JajoWallData,
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
        paddingTop: 4,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
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
            <Image
              src={project.images[selectedImage] ?? ""}
              height={1920}
              width={1080}
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
                  if (!image) {
                    return;
                  }

                  return (
                    <CarouselItem key={image}>
                      <Image
                        height={1080}
                        width={1920}
                        src={image}
                        alt="image"
                      />
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

      <div>
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
            property="true"
            height={150}
            width={200}
            layout="responsive"
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
                      property="true"
                      src={image}
                      layout="responsive"
                      height={1920}
                      width={1080}
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

      <div
        style={{
          borderBottom: "1px solid #a2a9b1",
          marginTop: 12,
          paddingBottom: 12,
        }}
      >
        <p>{project.description}</p>
      </div>
      <div>
        <h3 className="text-3xl pt-2 mb-2">Technology used</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: 16,
          }}
        >
          {project.techStack.map((technology) => (
            <span
              style={{
                backgroundColor: `rgba(${technology.color},0.4)`,
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
                border: `1px solid rgba(${technology.color},0.8)`,
              }}
              key={technology.name}
              className="text-sm"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </div>
      {project.additionalSections.map((section) => (
        <div key={`section-${section.title}`}>
          <h3
            style={{
              borderTop: "1px solid #a2a9b1",
            }}
            className="text-3xl pt-2 mb-2"
          >
            {section.title}
          </h3>
          <div
            style={{
              flexWrap: "wrap",
            }}
          >
            <span>{section.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
