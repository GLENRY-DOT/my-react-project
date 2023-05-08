import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryAndYearSelector from "./components/CountryAndYearSelector";
import Dropdown from "./components/elements/Dropdown";
import HolidayAndAreaSelector from "./components/HolidayAndAreaSelector";
import InfoCards from "./components/InfoCards";
import Card from "./components/elements/Card";

const App = () => {
  const [holidays, setHolidays] = useState([]);
  const [cities, setCities] = useState([]);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(Object);
  const [rentalInfo, setRentalInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCities = async (country) => {
    try {
      console.log("crawling cities...");
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        { country: country }
      );
      console.log(response.data.data);
      const dataWithKeys = response.data.data.map((name, index) => ({
        key: index,
        name,
      }));
      setCities(dataWithKeys);
    } catch (error) {
      console.log("Request failed:", error);
    }
  };

  const handleCountrySubmit = async (
    year: string,
    country: string,
    countryCode: string
  ) => {
    
    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=df7b3400cad924a1efa6ba82797742ed81b1bb59&country=${countryCode}&year=${year}&type=national`
    );
    const data = await response.json();
    const processedData = data.response.holidays.map(({ name, date }) => ({
      key: date.iso,
      name: name,
    }));
    setHolidays(processedData);
    fetchCities(country);
  };

  useEffect(() => {
    console.log("weather:", weather);
  }, [weather]);

  const handleHolidayAndCitySubmit = async (date: string, city: string) => {
    console.log("date:", date, "city", city);
    setDate(date);
    setCity(city);
    setWeather(Object);
    setRentalInfo([]);
    setIsLoading(true);

    console.log("crawling weather info...");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7d66f9dfa4871459e5e5955a8854d25&dt=${date}`
      );
      if (response.status === 404) {
        throw new Error("City not found");
      }
      const data = await response.json();
      if (data) {
        setWeather(data);
      }
    } catch (error) {
      console.error(error.message);
    }

    const checkinDate = new Date(date);
    const checkoutDate = new Date(checkinDate.getTime() + 86400000 * 2);
    const checkout = checkoutDate.toISOString().substring(0, 10);
    console.log(
      "crawing...",
      `http://localhost:5000/api/homes?city=${city}&checkin=${date}&checkout=${checkout}`
    );
    async function fetchRentalData() {
      const response1 = await fetch(
        `http://localhost:5000/api/homes?city=${city}&checkin=${date}&checkout=${checkout}`
      );
      const data1 = await response1.json();
      if (data1.length > 0) {
        setIsLoading(false);
        setRentalInfo(data1);
        console.log("rentalData:", data1);
      } else {
        console.warn("Received empty rental data, retrying...");
        await fetchRentalData();
      }
    }
    await fetchRentalData();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <CountryAndYearSelector onSubmit={handleCountrySubmit} />

          <HolidayAndAreaSelector
            holidays={holidays}
            cities={cities}
            onSubmit={handleHolidayAndCitySubmit}
          />
        </div>
        <div className="row">
          {Object.keys(weather).length > 0 ? (
            <InfoCards weather={weather} date={date} hotels={rentalInfo} />
          ) : (
            <p>No weather information available.</p>
          )}
          {isLoading && (<div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>)}
        </div>
      </div>
    </>
  );
};

export default App;
