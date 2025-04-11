import React from 'react';
import { assets } from '../../../assets/assets';
import './AboutMeUI.css';

const AboutMeUI: React.FC = () => {
  const skillsList = [
    { icon: assets.svg.ts, name: 'TypeScript' },
    { icon: assets.svg.js, name: 'JavaScript' },
    { icon: assets.svg.react, name: 'React' },
    { icon: assets.svg.threejs, name: 'Three.js' },
    { icon: assets.svg.blender, name: 'Blender' },
    { icon: assets.svg.unity, name: 'Unity' },
    { icon: assets.svg.opengl, name: 'OpenGL' },
    { icon: assets.svg.python, name: 'Python' },
    { icon: assets.svg.csh, name: 'C#' },
    { icon: assets.svg.cpp, name: 'C++' },
    { icon: assets.svg.php, name: 'PHP' },
    { icon: assets.svg.symfony, name: 'Symfony' },
  ];

  return (
    <>
      <div
        style={{ textAlign: 'justify', fontSize: '0.9rem', lineHeight: '1.5', minHeight: '280px' }}
      >
        <img
          src={assets.images.face}
          alt="Ray's Portrait"
          className="portrait"
        />
        <p>
          Hi, I’m Ray, a 3D developer with 4 years of experience. I specialize in
          creating immersive experiences and interactive 3D content, particularly using
          <b>Three.js</b> for <b>front-end development</b>. My work in 3D graphics allows me to blend
          creativity with technology to build visually stunning applications.
          <br/><br/>
          Alongside 3D front-end development, I’ve also worked in <b>Unity</b>, <b>Back-End</b>, and
          <b>VR development</b>, expanding my skills across multiple fields. These areas have
          allowed me to approach projects from different angles, offering a broad skill
          set to tackle diverse challenges.
          <br/><br/>
          I’m always excited to learn and explore new technologies, pushing myself to
          grow and adapt in an ever-evolving industry. Let’s connect and create
          something incredible together!
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3>Some of my skills...</h3>
        <div className="skills-container">
          {skillsList.map((skill, index) => (
            <div key={index} className="skill-item">
              <img
                src={skill.icon}
                alt={`skill-icon-${index}`}
                className="skill-icon"
              />
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
        <p>And more ...</p>
      </div>
    </>
  );
};

export default AboutMeUI;
