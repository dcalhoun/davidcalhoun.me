import React from 'react';

const ProjectCard = React.createClass({
  render() {
    const {name, description, href} = this.props;

    return (
      <a href={href} className='col-12 md-col-6 mb3 px2'>
        <div className='bg-silver rounded p2'>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </a>
    );
  }
});

export default ProjectCard;