import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CountryData from './CountryData';

const Countries = ({countries, search}) => {

    const [weatherCity, setWeatherCity] = useState()
    const [weatherData, setWeatherData] = useState({})
    const [imgUrl, setImgUrl] = useState()
    const screct_Id = process.env.REACT_APP_API_KEY

    useEffect(() => {
        if(countries.length === 1)
        {
            setWeatherCity(countries[0].name)
            if(weatherCity !== undefined)
            {
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&units=imperial&APPID=${screct_Id}`).then(response => {
                    setWeatherData(response.data)
                });
            }
        }
    }, [setWeatherCity, countries, weatherCity, screct_Id])

    useEffect(() => {
        if(weatherData.weather !== undefined)
        {
            let ss = weatherData.weather[0].icon
            let imgUrl = `http://openweathermap.org/img/wn/${ss}@2x.png`
            setImgUrl(imgUrl)
        }
    }, [setImgUrl, weatherData.weather])

    if (search === "") {
        return (
          <div>
          </div>
        )
    }

    if (countries.length > 10) {
        return (
          <div>
              Too many matches,specify another filter
          </div>
        )
    }

    if (countries.length === 0) {
        return (
          <div>
              No Data To Show
          </div>
        )
    }
 
    if (countries.length === 1) {
    
        return (
            <div>
                {countries &&
                    countries.map((country) => (
                        <div key={country.name}>
                            <h1>{country.name}</h1>
                            <div>capital {country.capital}</div>
                            <div>area {country.area}</div>
                            <h2>languages:</h2>
                            <ul>
                                {country.languages.map((lang) => (
                                    <li key={lang.name}>{lang.name}</li>
                                ))}
                            </ul>
                            <div>
                                <img src={country.flags.png} alt='falg'/>
                            </div>
                            <h1>Weather in Helsinki</h1>
                            {weatherData.main ?
                                <div>
                                <div>temperature-{weatherData.main.temp}℉</div>
                                <div><img src={imgUrl} alt="cloud"/></div>
                                <div>wind {weatherData.wind.speed}</div>
                                </div>
                                :
                                null
                            }
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div>
            {countries &&
                countries.map((country) => (
                <div key={country.name}>
                    <div>
                        {country.name}
                        <CountryData countryData={country} />
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default Countries;