import './Card.css'

interface Props {
    img ?: string;
    title : string;
    price ?: string;
    weather ?: string;
    location ?: string;
    date ?: string;
    name ?: string;
    description ?: string;
    temperature ?: string;
    link ?: string;
}

const Card = ({ img, title, location, date, weather, price, name, description, temperature, link } : Props) => {
    return (
        <div className="card custom-card container">
          {img && (<img src={img} className="card-img-top custom-card-img"/>)}
          <div className="card-body">
            <p className="card-text">Title : {title}</p>
            {date && (<p className="card-text">Date : {date}</p>)}
            {location && (<p className="card-text">Location : {location}</p>)}
            {weather && (<p className="card-text">Weather : {weather}</p>)}
            {name && (<p className="card-text">Hotel Name : {name}</p>)}
            {price && (<p className="card-text">Price : {price}</p>)}
            {temperature && (<p className="card-text">Temperature : {temperature}</p>)}
            {description && (<p className="card-text">Description : {description}</p>)}
            {link && (<a href={link}>Click here to visit Airbnb.</a>)}
          </div>
        </div>
    )
};

export default Card;