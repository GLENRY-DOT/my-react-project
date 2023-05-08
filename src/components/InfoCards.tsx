import RentalInfoCards from "./elements/RentalInfoCards";
import Card from "./elements/Card";

interface Props {
  date: string;
  weather: Object;
  hotels: {
    img: string;
    description: string;
    price: string;
    link: string;
    title: string;
  }[];
}

const InfoCards = ({ date, weather, hotels }: Props) => {
  return (
    <div className="container row">
      <div className="col">
        <Card
          title={"Weather Infomations"}
          date={date}
          weather={weather.weather[0].main}
          description={weather.weather[0].description}
        />
        {hotels ? (<RentalInfoCards data={hotels} />) : (<p>Loading...Please wait a minute</p>)}
      </div>
    </div>
  );
};

export default InfoCards;
