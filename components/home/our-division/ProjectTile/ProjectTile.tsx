import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectTile.module.scss";
import { DIVISION_IMAGES } from "../images";

interface IDivision {
  name: string;
  image: string;
  blurImage: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
}

interface ProjectTileProps {
  project: IDivision;
  classes?: string;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, classes = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get the imported image based on project name
  const getImage = () => {
    const name = project.name.toLowerCase();
    if (name === "innovate") return DIVISION_IMAGES.innovate;
    if (name === "educate") return DIVISION_IMAGES.educate;
    if (name === "elevate") return DIVISION_IMAGES.elevate;
    return null;
  };

  const imageSrc = getImage();

  // Position tech icons on LEFT side (near title area) - Responsive
  const getTechIconPosition = (index: number, total: number) => {
    // Mobile positions (smaller, closer together)
    const mobilePositions = [
      { top: "18%", left: "6%", transform: "rotate(-10deg)" },
      { top: "26%", left: "10%", transform: "rotate(15deg)" },
      { top: "34%", left: "5%", transform: "rotate(-15deg)" },
      { top: "42%", left: "8%", transform: "rotate(10deg)" },
    ];
    
    // Desktop positions
    const desktopPositions = [
      { top: "20%", left: "8%", transform: "rotate(-10deg)" },
      { top: "28%", left: "12%", transform: "rotate(15deg)" },
      { top: "36%", left: "6%", transform: "rotate(-15deg)" },
      { top: "44%", left: "10%", transform: "rotate(10deg)" },
      { top: "52%", left: "8%", transform: "rotate(-20deg)" },
      { top: "60%", left: "12%", transform: "rotate(20deg)" },
    ];
    
    // Use mobile positions for first 4 icons, desktop for rest
    if (index < 4) {
      return mobilePositions[index % mobilePositions.length];
    }
    return desktopPositions[index % desktopPositions.length];
  };

  return (
    <Link href={project.url} passHref>
      <a className={`${styles.ProjectTile} ${classes} cursor-pointer relative block`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered
            ? `0 20px 40px rgba(0, 0, 0, 0.3)`
            : `0 10px 20px rgba(0, 0, 0, 0.2)`,
        }}
      >
        {/* Geometric Overlay Pattern */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                             radial-gradient(circle at 80% 80%, white 1px, transparent 1px),
                             radial-gradient(circle at 40% 20%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px, 60px 60px, 40px 40px",
          }}
        />

        {/* Main Project Image - RIGHT Side and Slightly Tilted */}
        <div className="absolute inset-0 z-10 flex items-center justify-end pr-2 sm:pr-4 md:pr-6">
          <div
            className="relative w-1/2 sm:w-1/2 h-3/4 sm:h-4/5 max-w-[55%] sm:max-w-[60%]"
            style={{
              transform: isHovered ? "rotate(5deg) scale(1.05)" : "rotate(3deg) scale(1)",
              transition: "transform 0.3s ease",
            }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={project.name}
                layout="fill"
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.name}
                layout="fill"
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* Content Overlay - LEFT Side */}
        <div className="relative z-20 h-full flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Top Left - Project Name */}
          <div className="flex-shrink-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 drop-shadow-lg">
              {project.name}
            </h3>
          </div>

          {/* Bottom Left - Description */}
          <div className="flex-shrink-0 mt-auto">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium drop-shadow-lg max-w-[50%] sm:max-w-[48%] md:max-w-[45%] lg:max-w-[50%]">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech Icons - LEFT Side (near title area) */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {project.tech.slice(0, 4).map((tech, index) => {
            const position = getTechIconPosition(index, project.tech.length);
            return (
              <div
                key={index}
                className="absolute flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg border border-white/30 shadow-lg"
                style={position}
                title={tech}
              >
                <Image
                  src={`/projects/tech/${tech}.svg`}
                  alt={tech}
                  width={24}
                  height={24}
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            );
          })}
        </div>
      </a>
    </Link>
  );
};

export default ProjectTile;

