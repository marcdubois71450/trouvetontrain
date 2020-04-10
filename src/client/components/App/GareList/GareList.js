import React, { Component } from 'react';
const axios = require('axios');
import Gare from './Gare';
import './GareList.css';

export default class GareList extends Component {
  //This code was created by Marc Dubois
state = {
     Gare_List: [],
   };

onSelect = (name, pltf_uic_code) => {
  this.props.onSelectGare(name, pltf_uic_code)
};

api_gare_link(lat, lng) {
  return 'https://data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&geofilter.distance='+lat+'%2C'+lng+'%2C10000'
}

update_gare(local_props) {
 axios.get(this.api_gare_link(local_props.gps_lat, local_props.gps_lng)).then((response) => {
   var joined = []
   response.data.records.forEach(element => {
     if (element.fields.pltf_uic_code) {
       if (element.fields.gare_alias_libelle_noncontraint.startsWith("Gare")){var name=element.fields.gare_alias_libelle_noncontraint}else{var name="Gare de "+element.fields.gare_alias_libelle_noncontraint}
       var  local_gare = {
         name: name,
         pltf_uic_code: element.fields.pltf_uic_code
       }
      joined.push(local_gare)
     }
   });
   const filteredArr = joined.reduce((acc, current) => {
   const x = acc.find(item => item.pltf_uic_code === current.pltf_uic_code);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  const filteredArr2 = filteredArr.reduce((acc, current) => {
  const x = acc.find(item => item.name === current.name);
   if (!x) {
     return acc.concat([current]);
   } else {
     return acc;
   }
 }, []);
  this.setState({Gare_List: filteredArr2 })
 }).catch(function (error) {
   console.log(error);
 })
}

componentDidUpdate(prevProps) {
  if (prevProps.gps_lat !== this.props.gps_lat || prevProps.gps_lng !== this.props.gps_lng) {
    this.update_gare(this.props)
  }
}

componentDidMount() {
  this.update_gare(this.props)
}

  render() {
    //This code was created by Marc Dubois
    return (
      <div>
        {this.state.Gare_List.map((gare, i) => (
              <Gare key={i} name={gare.name} gare_select_uic={this.props.gare_select_uic} pltf_uic_code={gare.pltf_uic_code} onSelect={this.onSelect}/>
           ))}
      </div>
    );
  }
}
