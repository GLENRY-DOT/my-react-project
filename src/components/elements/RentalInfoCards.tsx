import Card from "./Card";
import './RentalInfoCards.css'

interface Props {
  data: {
    img: string;
    description: string;
    price: string;
    link: string;
    title: string
  }[];
}

const RentalInfoCards = ({ data }: Props) => {
  return (
    <>
      <div className="container">
        {data.map((item, index) => (
          <div key={index}>
            <Card
              img={item.img}
              description={item.description}
              title={item.title}
              price={item.price}
              link={item.link}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RentalInfoCards;
