import React from 'react';
import ReactDOM from 'react-dom';

import HomeGrid from './Home'

class Main extends React.Component {

  render() {
    return (
        <div>
            <HomeGrid />
        </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));