import React from 'react';
import { Link } from 'react-router-dom';
import mapTime from '../../../mappers/mapTime';

import {
  title,
  rtd,
  rtc,
  behindColor,
  goodColor,
} from './projectListRow.module.scss';

// Sanitize string inputs to remove Product prefix
const cleanName = str => {
  const match = str.match(/Labs \d{1,3} -(.+)/);
  return match[1];
};

const ProjectRow = ({ project }) => {
  // console.log("project list query", project);

  return (
    <tr>
      <td>
        <div className={project.status ? goodColor : behindColor}>
          {project.status ? 'on track' : 'behind'}
        </div>
      </td>
      <td className={title}>
        <Link to={`/project/${project.id}`} className={title}>
          {cleanName(project.name)}
        </Link>
      </td>
      <td>{project.sectionLead.name}</td>
      <td>{project.teamLead.name}</td>
      <td className={rtd}>
        {project.notes.length
          ? mapTime(project.notes[0].updatedAt)
          : mapTime(project.updatedAt)}
        ago
      </td>
      <td className={rtc}>
        <div className={project.status ? goodColor : behindColor}>
          {project.status ? 'on track' : 'behind'}
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
