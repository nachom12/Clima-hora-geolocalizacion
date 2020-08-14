const API_URL = 'http://api.weatherstack.com/current?' // URL DE LA API DEL CLIMA
const ACCESS_KEY = 'bd30917bddfb01ac021c66795d800f50' 

var fondo =
document.getElementById("body");
var clima = '';

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
}

//nachom aqui 
//-------------------------------------

const success_city = async(data) => {
    // console.log(`Latitude: ${data.coords.latitude}
    // Longitude: ${data.coords.longitude}`);
    var crd = data.coords; 
    var lat = crd.latitude.toString(); 
    var lng = crd.longitude.toString(); 
    var coordenadas = [lat, lng];
    const ciudad =  await obtenerCiudad(coordenadas)
    obtenerClima(ciudad)
}

const obtenerCiudad = async(coordenadas) => {
  return new Promise((resolve,reject) => {
      var xhr = new XMLHttpRequest(); 
      var lat = coordenadas[0]; 
      var lng = coordenadas[1]; 
  
      xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=e55ac6c7a3ccbb&lat=" + lat + "&lon=" + lng + "&format=json", true); 
      xhr.send(); 
      xhr.addEventListener("readystatechange", obtengoCiudad, false);
      
      function obtengoCiudad (data) {
          if (xhr.readyState == 4 && xhr.status == 200) { 
              var response = JSON.parse(xhr.responseText); 
              var city = response.address.city; 
              resolve(city)
          }
          // else{
          //      reject(new Error ('ERROR'))
          // } 
      }  
  })
}


function success_wheather (data){
    // console.log(`El clima en ${data.request.query} es: ${data.current.temperature} grados`)
    // console.log(`condicion del clima: ${data.current.weather_descriptions}`)
    // console.log(`velocidad del viento: ${data.current.wind_speed} km/h , direccion ${data.current.wind_dir}`)
 
    document.getElementById("grados").innerHTML = `${data.current.temperature}°C`;
    document.getElementById("localizacion").innerHTML = `Localidad: ${data.request.query}`;
    document.getElementById("temperatura").innerHTML = `<b>La temperatura es:</b> ${data.current.temperature}`;
    document.getElementById("agua-descripcion").innerHTML = `<b>Descripción:</b> ${data.current.weather_descriptions}`;
    document.getElementById("viento-velocidad").innerHTML = `<b>Velocidad de viento:</b> ${data.current.wind_speed}`;
}

function error(error){
  console.error(error.message)
}

function obtenerClima(ciudad){
  $
  .get(`${API_URL}access_key=${ACCESS_KEY}&query=${ciudad}`, {crossDomain: true}, success_wheather)
}
  
navigator.geolocation.getCurrentPosition(success_city, error, options)

//-------------------------------------

function laHora() {
  var fecha = new Date();
  var hora = fecha.getHours();
  var minuto = fecha.getMinutes();
  var segundo = fecha.getSeconds();
  
  document.getElementById("reloj").innerHTML = `${hora}h ${minuto}m ${segundo}s`
  // hora + 'h' + '-' + minuto + 'm' + '-' + segundo + 's';
  //console.log(hora,'-', minuto,'-', segundo);
  
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
