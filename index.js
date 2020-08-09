var fondo =
document.getElementById("body");
var clima = '';

//nachom aqui 
//-------------------------------------
const API_URL = 'http://api.weatherstack.com/current?'
const ACCESS_KEY = 'bd30917bddfb01ac021c66795d800f50'
const QUERY = 'Durazno'

function success (data){
    console.log(`El clima en ${QUERY} es: ${data.current.temperature} grados`)
    console.log(`condicion del clima: ${data.current.weather_descriptions}`)
    console.log(`velocidad del viento: ${data.current.wind_speed} km/h , direccion ${data.current.wind_dir}`)
 
    document.getElementById("grados").innerHTML = `${data.current.temperature}°C`;
    document.getElementById("localizacion").innerHTML = `Localidad: ${QUERY}`;
    document.getElementById("temperatura").innerHTML = `<b>La temperatura es:</b> ${data.current.temperature}`;
    document.getElementById("agua-descripcion").innerHTML = `<b>Descripción:</b> ${data.current.weather_descriptions}`;
    document.getElementById("viento-velocidad").innerHTML = `<b>Velocidad de viento:</b> ${data.current.wind_speed}`;
}
$.get(`${API_URL}access_key=${ACCESS_KEY}&query=${QUERY}`, {crossDomain: true}, success)
//-------------------------------------

function laHora() {
  var fecha = new Date();
  var hora = fecha.getHours();
  var minuto = fecha.getMinutes();
  var segundo = fecha.getSeconds();
  
  document.getElementById("reloj").innerHTML =
  hora + 'h' + '-' + minuto + 'm' + '-' + segundo + 's';
  console.log(hora,'-', minuto,'-', segundo);
  
  //---Establece color de fondo segun la hora---
  if ((hora > 7) & (hora < 18)) {//
    //console.log('es de dia');
    fondo.style.background = "radial-gradient(circle, rgba(255,238,139,1) 13%, rgba(203,237,255,1) 19%)";
    //fondo.style.opacity = '0.1';
  } else if ((hora >= 18) & (hora < 19)) {
    //console.log('es atardecer'); 
    fondo.style.background = "linear-gradient(0deg, rgba(255,100,101,1) 0%, rgba(255,230,157,1) 100%)";
  } else {
    //console.log('es de noche'); 
    fondo.style.background = "radial-gradient(circle, rgba(255,255,255,1) 6%, rgba(210,210,210,1) 8%)";
  }
}
setInterval(laHora, 1000);//genera bucle
