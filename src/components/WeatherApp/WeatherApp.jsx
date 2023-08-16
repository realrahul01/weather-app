// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import styles from "./WeatherApp.module.css";
const WeatherApp = () => {
  let time = new Date().toLocaleTimeString();
  const [clock, setClock] = useState(time);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')
  const [location, setLocation] = useState({name:'London',temp:20})
  const [weatherData, setWeatherData] = useState({
    celcius: 10,  
    name: "London",
    humidity: 10,
    speed: 2,
    visibility: 10,
    weather: "Sunny",
    image: "./Images/113.png",
    // backgroundPath: './Images/background.jpg'
        
  });

//this is the current position of the user and i am importing this from geoLocation.js file
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(position=>{
    console.log(position)
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
});

  //fetching the api data on the basis of latitude and longitude so that we can fetch the users current location
  if(latitude && longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=602a3a7e57c4b59bf497c47404706010&units=metric`)
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      setLocation({
        name:result.name,
        temp:result.main.temp
      })
    })
  }
  },[latitude,longitude,setLocation])
  

  // digital clock with date
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setClock(time);
  };
  setInterval(() => {
    updateTime();
  }, 1000);

  let data = new Date();
  let date = data.getDate();
  let day = data.getDay();
  let month = data.getMonth();
  let year = data.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thhusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let months = [
    "Janurary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let timeZone = `${days[day]}, ${date} ${months[month]} ${year}`;
  // console.log(d)  //it rendering in every secong because of setinterval but i didnot pass this variable inside setInterval...

  //  weatherApp logic
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  
  const getWeatherHandler = () => {
    //fetch api data after click
    // console.log("btn cliked");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=602a3a7e57c4b59bf497c47404706010&units=metric`
    )
      .then((res) => res.json())
      .then((data) =>  {

        // making condition for change image icon by the condition of weather
        let imagePath = '';
      if(data.weather[0].main === "Clouds"){
        imagePath = './Images/116.png'
      }else if(data.weather[0].main === "Rain"){
        imagePath = './Images/359.png'
      }else if(data.weather[0].main === 'Mist'){
        imagePath = "./Images/200.png"
      }else if(data.weather[0].main === "Clear"){
        imagePath = './Images/113.png'
      }else if(data.weather[0].main === "Haze"){
        imagePath = './Images/248.png'
      }else if(data.weather[0].main === "Thunderstorm"){
        imagePath = "./Images/389.png"
      }
      else{
        imagePath = './Images/113.png'
      }

        
        setWeatherData({                                                
          ...data,                     // ask what if we don not make copy of this data 
          celcius: data.main.temp,
          name: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
          visibility: data.visibility,
          weather:data.weather[0].main,
          image:imagePath,
        })
      })
      .catch(() => {
        setError("enter a valid city name");
        setTimeout(()=>{
          setError('')
        },3000)
      });
    setSearch("");



  };



// console.log(weatherData.weather)
  // console.log(weatherData)
  
  //   useEffect(()=>{    // fetch api data after mounting
  //     fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=602a3a7e57c4b59bf497c47404706010&units=metric`
  //       )
  //         .then((res) => res.json())
  //         .then((data) =>
  //           setWeatherData({
  //             ...data,
  //             celcius: data.main.temp,
  //             name: data.name,
  //             humidity: data.main.humidity,
  //             speed: data.wind.speed,
  //             visibility: data.visibility,
  //           })
  //         );
  //   },[])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerPart1}>
          <h3>{location.name} <br /> In</h3>
          <p className={styles.clock}>{clock}</p>
          <p className={styles.timeZone}>{timeZone}</p>
          <p className={styles.geotemp}>{Math.ceil(location.temp)}°C</p>
        </div>

        {/* second phase here weather app UI */}
        <div className={styles.containerPart2}>
          <div className={styles.gif}>
            <h1>The WeatherApp</h1>
          </div>
          <div className={styles.weather}>
            <span>{weatherData.weather}</span>
          </div>
          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="search the city"
              onChange={changeHandler}
              value={search}
            />
            <button onClick={getWeatherHandler}>
              <img
                src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                alt="error"
              />
            </button>
            <p className={styles.error}>{error}</p>
          </div>
          <div>
            <div className="searchName">
              <p>{weatherData.name}, IN</p>
            </div>
            
            <div className={styles.weatherIcon}>
              <img src= {weatherData.image} alt="" />
              <p>{weatherData.weather}</p>  
            </div>
          </div>
          <div className={styles.weatherDetail}>
            <span>Temperature</span>
            <span>{weatherData.celcius}°C ({weatherData.weather})</span>
          </div>
          <div className={styles.weatherDetail}>
            <span>Humidity</span>
            <span>{weatherData.humidity}</span>
          </div>
          <div className={styles.weatherDetail}>
            <span>Visibility</span>
            <span>{weatherData.visibility}</span>
          </div>
          <div className={styles.weatherDetail}>
            <span>Wind Speed</span>
            <span>{weatherData.speed} Km/h</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeatherApp;
