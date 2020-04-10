import React, { Component } from 'react';
const axios = require('axios');
import './TrajetList.css';
import Trajet from './Trajet';
import ErrorSVG from './error.svg';
import LoaderSVG from './loader.svg';

export default class TrajetList extends Component {
  //This code was created by Marc Dubois
state = {
     Trajet_List: [],
     trajet_exist: false,
     loader: true
   };

api_gare_link(from_uic, to_uic) {
  return 'https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:OCE:SA:'+from_uic+'&to=stop_area:OCE:SA:'+to_uic
}

update_trajet(local_props) {
 const headers = {'Accept': 'application/json', 'Authorization': "e4d1a3ed-1770-4f39-acaa-b14ff61d5a78"}
 axios.get(this.api_gare_link(local_props.from_uic,local_props.to_uic),{headers: headers}).then((response) => {
   if (response.data.journeys == undefined) {
      this.setState({ Trajet_List: [], trajet_exist: false, loader: false})
   } else {
      this.setState({ Trajet_List: response.data.journeys, trajet_exist: true, loader: false})
   }
 }).catch((error) => {
   console.log(error);
   this.setState({ Trajet_List: [], trajet_exist: false, loader: false})
 })
}

componentDidUpdate(prevProps) {
  if (prevProps.from_uic !== this.props.from_uic || prevProps.to_uic !== this.props.to_uic) {
    this.setState({ loader: true})
    this.update_trajet(this.props)
  }
}
componentDidMount() {
  this.update_trajet(this.props)
}

  render() {
    //This code was created by Marc Dubois
    return (
      <div>
            {this.state.loader ?
              <img src={LoaderSVG} styleName="loader-logo" alt="Error Logo" />
            :
            <div>
                {this.state.trajet_exist ?
                  <div>
                  {this.state.Trajet_List.map((trajet, i) => (
                       <Trajet key={i} trajet={trajet} />
                    ))}
                  </div>
                  :
                  <div styleName="no-trajet">
                    <img src={ErrorSVG} styleName="error-logo" alt="Error Logo" />
                    <div styleName="no-trajet-text">Aucun trajet disponible entre les gares sélectionnées.</div>
                  </div>
                }
            </div>
            }
      </div>
    );
  }
}
