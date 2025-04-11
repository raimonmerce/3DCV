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
            <div className="project-skills-container">
              {project.skills.map((skill, index) => (
                <div key={index} className="project-skill-item">
                  <img
                    src={skill.icon}
                    alt={`skill-icon-${index}`}
                    className="project-skill-icon"
                  />
                  <p className="project-skill-name">{skill.name}</p>
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
      { icon: assets.svg.ts, name: 'TypeScript' },
      { icon: assets.svg.react, name: 'React' },
      { icon: assets.svg.threejs, name: 'Three.js' },
      { icon: assets.svg.blender, name: 'Blender' },
      { icon: assets.svg.n8n, name: 'n8n' },
    ]
  },
  {
    title: "Raimon Merce",
    description:
      "This personal portfolio website showcases my skills in 3D development, React, and web design. Built as a one-page site, it integrates uses Three.js, React Three Fiber and Drei for 3D utilities, Tween for smooth animations, and Blender to create custom models.",
    image: assets.images.raimonmerce,
    link: "https://www.raimonmerce.com/",
    skills: [
      { icon: assets.svg.ts, name: 'TypeScript' },
      { icon: assets.svg.react, name: 'React' },
      { icon: assets.svg.threejs, name: 'Three.js' },
      { icon: assets.svg.blender, name: 'Blender' }
    ]
  },
  {
    title: "Xesco Mercé",
    description:
      "The Xesco Mercé portfolio is a personal website built to highlight the artistic works of Xesco Mercé.",
    image: assets.images.xescomerce,
    link: "https://www.xescomerce.com/",
    skills: [
      { icon: assets.svg.ts, name: 'TypeScript' },
      { icon: assets.svg.react, name: 'React' },
      { icon: assets.svg.tailwind, name: 'Tailwind' },
    ]
  },
  {
    title: "Unity Plugin for Work Risk Simulations",
    description:
      "A Unity plugin that allows non-programmers to create immersive workplace safety simulations, improving training and risk assessment.",
    image: assets.images.tfg1,
    skills: [
      { icon: assets.svg.unity, name: 'Unity' },
      { icon: assets.svg.csh, name: 'C#' },
      { icon: assets.svg.blender, name: 'Blender' },
    ]
  },
  {
    title: "Scene Understanding & Synthesis Pipeline",
    description:
      "A deep learning pipeline that reconstructs real-world 3D environments and proposes alternative layouts based on user input.",
    image: assets.images.tfm1,
    link: "https://github.com/raimonmerce/SUSP_MAIN",
    skills: [
      { icon: assets.svg.python, name: 'Python' },
      { icon: assets.svg.js, name: 'JavaScript' },
    ]
  },
  {
    title: "RayEngine",
    description:
      "A low-level C++ OpenGL graphics engine designed for creating retro aesthetic games with optimized rendering and performance. (Still in progress)",
    image: assets.images.rayengine,
    link: "https://github.com/raimonmerce/RayEngine",
    skills: [
      { icon: assets.svg.cpp, name: 'C++' },
      { icon: assets.svg.opengl, name: 'OpenGL' },
    ]
  }
];