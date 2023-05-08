import { useState } from "react";
import Dropdown from "./elements/Dropdown";

interface Props {
  holidays: { key: string; name: string }[];
  cities: { key: string; name: string }[];
  onSubmit: (date: string, city: string) => void;
}

const HolidayAndAreaSelector = ({
  holidays,
  cities,
  onSubmit,
}: Props) => {
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleHolidayChange = (event) => {
    if (holidays && holidays.length > 0) {
      setSelectedHoliday(holidays.find((holiday) => holiday.name === event.target.value)?.key);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("adch");
    event.preventDefault();
    onSubmit(selectedHoliday, selectedCity);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dropdown
          title="Choose a holiday"
          data={holidays}
          onChange={handleHolidayChange}
          keyIsVisable={true}
        />
        <br />
        <Dropdown
          title="Choose a city"
          data={cities}
          onChange={handleCityChange}
          keyIsVisable={false}
        />
        <br />
        <button
          type="submit"
          className="btn btn-outline-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default HolidayAndAreaSelector;
