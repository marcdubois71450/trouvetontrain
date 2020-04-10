import React, { Component } from 'react';
import './Gare.css';

export default class Gare extends Component {
  //This code was created by Marc Dubois
  render() {
    //This code was created by Marc Dubois
    const { name, pltf_uic_code, gare_select_uic, onSelect} = this.props;
    const handler =  () => {onSelect(name, pltf_uic_code)};
    return (
      <div>
        {gare_select_uic == pltf_uic_code ?
            <div styleName="gare-select">{name}</div>
          :
            <div styleName="gare" onClick={handler}>{name}</div>
        }
      </div>
    );
  }
}
