import React, { Component } from 'react';
import { connect } from 'react-redux'
import GareList from './GareList';
import TrajetList from './TrajetList';
import './App.css';
import Geocode from "react-geocode";
import { geocodeSearch } from '../Services/geocode'


export default class App extends Component {
  //This code was created by Marc Dubois
state = {
     formatted_address_from: "",
     formatted_address_to: "",
     lat_from: "",
     lng_from:"",
     lat_to:"",
     lng_to:"",
     from_addr_value: "",
     to_addr_value: "",
     select_gare_from: {},
     select_gare_to: {},
   };

onSelectGareFrom = (name, pltf_uic_code) => {
 this.setState({select_gare_from:{name:name,uic:pltf_uic_code}})
}

onSelectGareTo = (name, pltf_uic_code) => {
 this.setState({select_gare_to:{name:name,uic:pltf_uic_code}})
}

geoCodeFrom = (e) => {
  e.persist()
  if (!this.state.wait_from) {
    this.setState({wait_from: true});
    geocodeSearch(e.target.value).then((resp) => {
      this.setState({ formatted_address_from: resp.formatted_address, lat_from: resp.lat, lng_from: resp.lng, formatted_address_from_state: resp.formatted_address_state, wait_from: false});
    }).catch((formatted_address_from_state) => {
      if (this.state.formatted_address_from) {
          this.setState({ formatted_address_from_state: !formatted_address_from_state, wait_from: false})
      } else {
          this.setState({ formatted_address_from_state: formatted_address_from_state, wait_from: false})
      }
    })
  } else {
    setTimeout(() => {this.geoCodeFrom(e)}, 20);
  }
}

changeFrom = (e) => {
  this.setState({ from_addr_value: e.target.value, select_gare_from: {}})
  if (e.target.value.length > 3) {
      this.geoCodeFrom(e)
  } else {
    this.setState({ formatted_address_from_state: false})
  }
};

geoCodeTo = (e) => {
  e.persist()
  if (!this.state.wait_to) {
    this.setState({wait_to: true});
    geocodeSearch(e.target.value).then((resp) => {
      this.setState({ formatted_address_to: resp.formatted_address, lat_to: resp.lat, lng_to: resp.lng, formatted_address_to_state: resp.formatted_address_state, wait_to: false});
    }).catch((formatted_address_to_state) => {
      if (this.state.formatted_address_to) {
          this.setState({ formatted_address_to_state: !formatted_address_to_state, wait_to: false})
      } else {
          this.setState({ formatted_address_to_state: formatted_address_to_state, wait_to: false})
      }
    })
  } else {
    setTimeout(() => {this.geoCodeTo(e)}, 20);
  }
}

changeTo = (e) => {
  this.setState({ to_addr_value: e.target.value, select_gare_to: {}})
  if (e.target.value.length > 3) {
    this.geoCodeTo(e)
  } else {
    this.setState({ formatted_address_to_state: false})
  }
};

onBlurFrom = (e) => {
  if (3 < e.target.value.length) {
      setTimeout(() => { this.setState({ from_addr_value: this.state.formatted_address_from}) }, 1000);
  }
}

onBlurTo = (e) => {
  if (3 < e.target.value.length) {
    setTimeout(() => { this.setState({ to_addr_value: this.state.formatted_address_to}) }, 1000);
  }
}

getcss = () => {
  if (this.state.formatted_address_to_state) {
    return "search-zone-from search-zone-gare"
  } else {
    return "search-zone-from search-zone-nogare"
  }
}

render() {
  //This code was created by Marc Dubois
    return (
      <div>
        <div styleName="search-zone">
          <div styleName={this.state.formatted_address_from_state ? 'search-zone-from search-zone-gare' : 'search-zone-from search-zone-nogare'}>
              <div styleName="title-from">Lieu de départ</div>
              <input styleName="input-addr-from" onBlur={this.onBlurFrom} value={this.state.from_addr_value} onChange={this.changeFrom} />
              {this.state.formatted_address_from_state &&
                <div styleName="gare-list-from">
                  <GareList key="0" gare_select_uic={this.state.select_gare_from.uic} gps_lat={this.state.lat_from} gps_lng={this.state.lng_from} onSelectGare={this.onSelectGareFrom} />
                </div>
                }
          </div>
          <div styleName={this.state.formatted_address_to_state ? 'search-zone-to search-zone-gare' : 'search-zone-to search-zone-nogare'}>
                <div styleName="title-to">Lieu d'arrivée</div>
              <input styleName="input-addr-to" onBlur={this.onBlurTo} value={this.state.to_addr_value} onChange={this.changeTo} />
              {this.state.formatted_address_to_state &&
                <div styleName="gare-list-to">
                  <GareList key="1" gare_select_uic={this.state.select_gare_to.uic} gps_lat={this.state.lat_to} gps_lng={this.state.lng_to} onSelectGare={this.onSelectGareTo} />
                </div>
                }
          </div>
        </div>
        <div>
            <div styleName="trajet-list">
            {(this.state.select_gare_from.uic && this.state.select_gare_to.uic) ?
               <div>
                {this.state.select_gare_from.uic !== this.state.select_gare_to.uic ? <div styleName="itinery">Voici les itinéraires depuis la <u>{this.state.select_gare_from.name}</u>  jusqu'à la <u>{this.state.select_gare_to.name}</u> :</div> : <div styleName="itinery">Vous avez sélectionné les mêmes gares...</div>}

                  <TrajetList from_uic={this.state.select_gare_from.uic} to_uic={this.state.select_gare_to.uic} />
               </div>
               :
               <div styleName="thanx-gare">
                 {this.state.select_gare_from.uic ?
                   <p>Merci de sélectionner votre gare d'arrivée.</p>
                   :
                   <div>
                   {this.state.select_gare_to.uic ?
                     <p>Merci de sélectionner votre gare de départ.</p>
                     :
                     <p>Merci de sélectionner vos gares.</p>
                   }
                  </div>
                 }
               </div>
             }
             </div>
        </div>
      </div>
    );
  }
}
