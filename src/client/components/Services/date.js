//This code was created by Marc Dubois
export function sncf_to_display(date) {
  return date.substring(9, 11)+"h"+date.substring(11, 13)+" - "+date.substring(6, 8)+" "+get_mois(date.substring(4, 6))+" "+date.substring(0, 4)
}

function get_mois(m){
 if (m == "01") {
      return "Janvier"
  } else if (m == "02") {
      return "Février"
  } else if (m == "03") {
      return "Mars"
  } else if (m == "04") {
      return  "Avril"
  } else if (m == "05") {
      return "Mai"
  } else if (m == "06") {
      return "Juin"
  } else if (m == "07") {
      return "Juillet"
  } else if (m == "08") {
      return "Aout"
  } else if (m == "09") {
      return "Septembre"
  } else if (m == "10") {
      return "Octobre"
  } else if (m == "11") {
      return "Novembre"
  } else if (m == "12") {
      return "Decembre"
  }
}


export function sncf_to_display_duration(sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    if (minutes < 10) {minutes = "0"+minutes;}
    return hours+'h'+minutes;
}
