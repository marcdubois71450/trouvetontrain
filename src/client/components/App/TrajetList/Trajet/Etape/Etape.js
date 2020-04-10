import React, { Component } from 'react';
import './Etape.css';

export default class Etape extends Component {
  //This code was created by Marc Dubois
state = {
  etape: {},
  from: "",
  to: "",
  temps:"",
  type: "",
  mode: "",
  num: 0
};

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

update_etape(etape) {
 if (etape.type == "waiting") {
   this.setState({type: etape.type, temps: this.sec_to_display(etape.duration), num: this.props.num})
 } else if (etape.type == "public_transport") {
   this.setState({mode: etape.from.id.substring(etape.from.id.indexOf("SP:")+3,etape.from.id.indexOf("-")),
                  from: etape.from.name,
                  to: etape.to.name,
                  type: etape.type,
                  temps: this.sec_to_display(etape.duration),
                  num: this.props.num
                })
 } else if (etape.type == "transfer" || etape.type == "crow_fly") {
    this.setState({from: etape.from.id.substring(etape.from.id.indexOf("SP:")+3,etape.from.id.indexOf("-"))+" "+etape.from.name,
                   to: etape.to.id.substring(etape.to.id.indexOf("SP:")+3,etape.to.id.indexOf("-")) + " " +etape.to.name,
                   type: "transfer",
                   temps: this.sec_to_display(etape.duration),
                   num: this.props.num
                 })
 } else {
   console.log("Ce type d'etape n'as pas été comprise (faute de trajet durant le Covid-19), la voici : "+etape.type);
 }
}

componentDidUpdate(prevProps) {
  if (prevProps.etape !== this.props.etape) {
    this.update_etape(this.props.etape)
  }
}

componentDidMount() {
  this.update_etape(this.props.etape)
}

  render() {
    //This code was created by Marc Dubois
    return (
      <div styleName="etape">
        {this.state.type == "waiting" && <div><u>Etape {this.state.num} |</u> Attendre <u>{this.state.temps}</u>.</div>}
        {this.state.type == "public_transport" && <div><u>Etape {this.state.num} |</u> Trajet en <u>{this.state.mode}</u> depuis <u>{this.state.from}</u> jusqu'à <u>{this.state.to}</u>, pendant <u>{this.state.temps}</u>.</div>}
        {this.state.type == "transfer" && <div><u>Etape {this.state.num} |</u> Marcher depuis <u>{this.state.from}</u> jusqu'à <u>{this.state.to}</u>, pendant <u>{this.state.temps}</u>.</div>}
      </div>
    );
  }
}
