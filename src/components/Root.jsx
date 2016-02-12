import React from 'react';
import css from '../app.css';

export default class Root extends React.Component {
  render() {
    const {assets, children, title} = this.props;

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <title>{title}</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body className='p2'>
          <div id='js-outlet'>
            {React.cloneElement(children, this.props)}
          </div>
          {Object.keys(assets).map((chunk, index) => {
            return <script key={index} src={'/' + assets[chunk]}/>;
          })}
        </body>
      </html>
    );
  }
}
