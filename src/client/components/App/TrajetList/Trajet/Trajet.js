import React, { Component } from 'react';
import './Trajet.css';
import Etape from './Etape';

export default class Trajet extends Component {
  //This code was created by Marc Dubois
state = {
  depart: "",
  arrive: "",
  etapes: [],
  duree: "",
  co2: ""
};

componentDidUpdate(prevProps) {
  if (prevProps.trajet !== this.props.trajet) {
    this.update_trajet(this.props.trajet)
  }
}

componentDidMount() {
  this.update_trajet(this.props.trajet)
}

sec_to_display(sec_num) {
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  if (hours == "00") {
    return minutes+'min';
  } else {
    return hours+'h'+minutes+'min';
  }
}

update_trajet(trajet) {
  var local_etapes = [];
  trajet.sections.forEach(element=>{if(element.duration !== 0){local_etapes.push(element)}});
  this.setState({
       depart: trajet.departure_date_time.substring(9, 11)+":"+trajet.departure_date_time.substring(11, 13)+" - "+trajet.departure_date_time.substring(6, 8)+"/"+trajet.departure_date_time.substring(4, 6)+"/"+trajet.departure_date_time.substring(0, 4),
       arrive: trajet.arrival_date_time.substring(9, 11)+":"+trajet.arrival_date_time.substring(11, 13)+" - "+trajet.arrival_date_time.substring(6, 8)+"/"+trajet.arrival_date_time.substring(4, 6)+"/"+trajet.arrival_date_time.substring(0, 4),
       etapes: local_etapes,
       duree: this.sec_to_display(trajet.duration),
       co2: trajet.co2_emission.value+" "+trajet.co2_emission.unit
   })
}

  render() {
    //This code was created by Marc Dubois
    return (
      <div styleName="full-trajet-list">
      <div styleName="trajet-list-co2">CO2 : {this.state.co2}</div>
      <div styleName="trajet-list-time1"><u>Départ :</u> {this.state.depart}</div>
      <div styleName="trajet-list-time2"><u>Arrivée :</u> {this.state.arrive}</div>
      <div styleName="trajet-list-time3"><u>Durée :</u> {this.state.duree}</div>
        <div styleName="etapes">
          {this.state.etapes.map((etape, i) => (
              <Etape key={i} num={i+1} etape={etape} />
          ))}
        </div>
      </div>
    );
  }
}
