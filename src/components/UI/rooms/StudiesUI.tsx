import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {assets} from '../../../assets/assets'

export default function StudiesUI() {
  return (
    <>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(175, 36, 18)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(175, 36, 18)' }}
          date="Agu. 2022 – Feb. 2023"
          dateClassName='goRight'
          iconStyle={{ background: '#fff', color: '#fff' }}
          icon={<img src={assets.svg.tut} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Toyohashi University of Technology (TUT)</h3>
          <h4 className="vertical-timeline-element-subtitle">Toyohashi, Japan</h4>
          <ul>
            <li>3rd Semester of Master in Imaging and Light in Extended Reality (<b>IMLEX</b>)</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(201, 96, 18)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(201, 96, 18)' }}
          date="Jan. 2022 – Jul. 2022"
          iconStyle={{ background: 'rgb(201, 96, 18)', color: '#fff' }}
          icon={<img src={assets.svg.ujm} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Universit´e Jean Monnet (UJM)</h3>
          <h4 className="vertical-timeline-element-subtitle">Saint-Étienne, France</h4>
          <ul>
            <li>2nd Semester of Master in Imaging and Light in Extended Reality (<b>IMLEX</b>)</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
          date="Sep. 2021 – Jan. 2022"
          dateClassName='goRight'
          iconStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
          icon={<img src={assets.svg.uef} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">University of Eastern Finland (UEF)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Joensuu, Finland</h4>
          <ul>
            <li>1st Semester of Master in Imaging and Light in Extended Reality (<b>IMLEX</b>)</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(38, 101, 190)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(38, 101, 190)' }}
          date="Sep. 2019 – Feb. 2020"
          iconStyle={{ background: 'rgb(38, 101, 190)', color: '#fff' }}
          icon={<img src={assets.svg.ctu} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Czech Technical University (CTU)</h3>
          <h4 className="vertical-timeline-element-subtitle">Prague, Czech Republic</h4>
          <ul>
            <li>Erasmus Exchange Program</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(64, 132, 167)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(64, 132, 167)' }}
          date=" Sep. 2016 – Jun. 2020"
          dateClassName='goRight'
          iconStyle={{ background: 'rgb(64, 132, 167)', color: '#fff' }}
          icon={<img src={assets.svg.upc} alt="icon" style={{ width: "100%", height: "100%", borderRadius: "50%"  }} />}
        >
          <h3 className="vertical-timeline-element-title">Polytechnic University of Catalonia (UPC)</h3>
          <h4 className="vertical-timeline-element-subtitle">Barcelona, Spain</h4>
          <ul>
            <li>Bachelor Degree in Computer Science, Major in Software Engineering</li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline> 
    </>
  );
}
