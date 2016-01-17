import React from 'react';
import styles from '../app.css';

export default class Root extends React.Component {
  render() {

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" type="text/css" href="./bundle.css" media="screen" />
        </head>
        <body>
          <div id="js-outlet">
            {this.props.children}
          </div>
          <script src="./bundle.js" />
        </body>
      </html>
    );
  }
}
