import { assets } from '../../../assets/assets';
import './ProjectsUI.css';

export default function ProjectsUI() {
  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <div key={index} className="project-card">
          {project.image && (
            <img src={project.image} alt={project.title} className="project-image" />
          )}
          <h2 className="project-title">{project.title}</h2>
          <p className="project-description">{project.description}</p>
          {project.skills && project.skills.length > 0 && (
            <div className="skills-container">
              {project.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <img src={skill} alt={`skill-icon-${index}`} className="skill-icon" />
                </div>
              ))}
            </div>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-button"
            >
              Learn More
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

const projects = [
  {
    title: "3DLink",
    description:
      "A web-based 3D space generator where users can create personal avatars, add social network links, and interact with an AI chatbot powered by N8N. Made together with Union Avatars and using R3F and Drei",
    image: assets.images.link3d,
    link: "https://cai.stage.unionavatars.unionavatars.com/",
    skills: [
      assets.svg.ts,
      assets.svg.react,
      assets.svg.threejs,
      assets.svg.blender
    ]
  },
  {
    title: "Unity Plugin for Work Risk Simulations",
    description:
      "A Unity plugin that allows non-programmers to create immersive workplace safety simulations, improving training and risk assessment.",
    image: assets.images.tfg1,
    skills: [
      assets.svg.unity,
      assets.svg.csh,
      assets.svg.blender,
    ]
  },
  {
    title: "Scene Understanding & Synthesis Pipeline",
    description:
      "A deep learning pipeline that reconstructs real-world 3D environments and proposes alternative layouts based on user input.",
    image: assets.images.tfm1,
    link: "https://github.com/raimonmerce/SUSP_MAIN",
    skills: [
      assets.svg.python,
      assets.svg.js,
    ]
  },
  {
    title: "RayEngine",
    description:
      "A low-level C++ OpenGL graphics engine designed for creating retro aesthetic games with optimized rendering and performance. (Still in progress)",
    image: assets.images.rayengine,
    link: "https://github.com/raimonmerce/RayEngine",
    skills: [
      assets.svg.cpp,
      assets.svg.opengl,
    ]
  }
];
