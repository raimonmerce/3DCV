import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './ExperienceUI.css';
import {assets} from '../../../assets/assets'
export default function ExperienceUI() {
  return (
    <>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(94, 186, 216)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(94, 186, 216)' }}
          date="Dec. 2024 - present"
          dateClassName='goRight'
          iconStyle={{ background: 'rgb(94, 186, 216)', color: '#fff' }}
          icon={<img src={assets.svg.unionavatars} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Front-End 3D Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">Union Avatars</h4>
          <ul>
            <li>Creating and improving features for avatar customizer and generating new interactive virtual spaces. (<b>TypeScript</b>, <b>React</b>, <b>Blender</b>, <b>Three JS</b>)</li>
            <li>Enhancing scenes rendering using shaders and postprocessing technics (<b>GLSL</b>, <b>Shaders</b>).</li>
            <li>Adapting 3D scenes and avatars to VR devices (<b>Unity</b>, <b>C#</b>, <b>Blender</b>).</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(0, 0, 0)' }}
          date="Nov. 2023 - Nov. 2024"
          iconStyle={{ background: 'rgb(0, 0, 0)', color: '#fff' }}
          icon={<img src={assets.svg.tmrw} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Front-End Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">TMRW Foundation</h4>
          <ul>
            <li>Developing features for a 3D videocall application (Room 3D) using the company 3D engine (NativeEngine) and on the Front-End side (<b>React</b>, <b>TypeScript</b>).</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(244, 109, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(244, 109, 0)' }}
          date="Sep. 2022 – Aug. 2023"
          dateClassName='goRight'
          iconStyle={{ background: 'rgb(244, 109, 0)', color: '#fff' }}
          icon={<img src={assets.svg.floorfy} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Front-End 3D Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">Floorfy</h4>
          <ul>
            <li>Created a 3D graphics visualization tool for indoor scene generation (<b>ThreeJS</b>, <b>JavaScript</b>, <b>Shaders</b>, <b>GLSL</b>).</li>
            <li>Master’s Thesis: Developed a Scene Understanding and Scene Synthesis pipeline using Deep Learning models for detecting and generating indoor scenes (<b>Python</b>, <b>Deep Learning</b>).</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(244, 109, 0)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(244, 109, 0)' }}
          date="Sep. 2020 – Aug. 2021 "
          iconStyle={{ background: 'rgb(244, 109, 0)', color: '#fff' }}
          icon={<img src={assets.svg.floorfy} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Back-End Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">Floorfy</h4>
          <ul>
            <li>Implemented new back-end features using <b>Symfony</b> (<b>PHP</b>), <b>AWS</b> and <b>MySQL</b>.</li>
            <li>Developing a solution for bills and payments management for all type of clients and a notification system using Stripe and Mailchimp APIs.</li>
            <li>Integration of HubSpot API for marketing and sales department and implementation of all the scripts to migrate the needed MySQL information.</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(21, 52, 154)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(21, 52, 154)' }}
          date="Jul. 2019 – Aug. 2019 "
          dateClassName='goRight'
          iconStyle={{ background: 'rgb(21, 52, 154)', color: '#fff' }}
          icon={<img src={assets.svg.ecb} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Web Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">European Central Bank</h4>
          <ul>
            <li>Internship focused on developing a website (HTML, CSS, JavaScript) to manage the institution bus schedules.</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(26, 73, 151)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(26, 73, 151)' }}
          date="Sep. 2018 – Jul. 2020"
          iconStyle={{ background: 'rgb(26, 73, 151)', color: '#fff' }}
          icon={<img src={assets.svg.cimne} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">VR/AR Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">CIMNE</h4>
          <ul>
            <li>Developing a project in Unity (<b>C#</b>) for AR devices (<b>Magic Leap</b>) to show the capabilities and features of AR technology.</li>
            <li>Setting up a 3D multi-projector room in order to stream 2D/3D content from any device using a local network.</li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline> 
    </>
  );
}
