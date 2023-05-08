import { useEffect, useState } from "react";
import Dropdown from "./elements/Dropdown";

interface Props {
  onSubmit: (year: string, country: string, countryCode: string) => void;
}

const CountryAndYearSelector = ({ onSubmit }: Props) => {
  const startYear = 2020;
  const yearRange = Array.from({ length: 6 }, (_, i) => ({
    name: (startYear + i).toString(),
    key: (startYear + i).toString(),
  }));

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        `https://calendarific.com/api/v2/countries?api_key=df7b3400cad924a1efa6ba82797742ed81b1bb59`
      );
      const data = await response.json();
      const processedData = data.response.countries.map(
        ({ country_name, "iso-3166": iso }) => ({
          key: iso,
          name: country_name,
        })
      );
      setCountryList(processedData);
    };
    fetchCountries();
  }, []);

  const [selectedYear, setSelectedYear] = useState("2020");
  const [selectedCountry, setSelectedCountry] = useState("Afghanistan");
  const [selectedCountryCode, setSelectedCountryCode] = useState("AF");
  const [countryList, setCountryList] = useState([]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCountryCode(
      countryList.find((country) => country.name === event.target.value)?.key
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedYear, selectedCountry, selectedCountryCode);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{width:"500px"}}>
        <Dropdown
          data={yearRange}
          title="Select a year"
          onChange={handleYearChange}
          keyIsVisable={false}
        />
        <br />
        <Dropdown
          data={countryList}
          title="Select a country"
          onChange={handleCountryChange}
          keyIsVisable={false}
        />
        <br />
        <button
          type="submit"
          id="submit-btn"
          className="btn btn-outline-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CountryAndYearSelector;
