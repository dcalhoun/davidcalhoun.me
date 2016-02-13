import React from 'react';
import ProjectCard from './ProjectCard';

export default class Projects extends React.Component {
  render() {
    const rsquo = String.fromCharCode(8217);

    return (
      <section>
        <h2>Featured Projects</h2>
        <ProjectCard
          {...this.props}
          name='GoNoodle'
          description='We gets kids moving to be their strongest, bravest, silliest, smartest, bestest selves.'
          href='https://www.gonoodle.com'/>
        <ProjectCard
          {...this.props}
          name='Playbook'
          description='A Yeoman generator for prototyping and building experiences.'
          href='http://playbook.centresource.com'/>
      </section>
    );
  }
}