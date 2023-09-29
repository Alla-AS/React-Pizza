import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const {id} = useParams();
  const navigate =useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas/${id}`);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при запросе пиццы");
        navigate('/');
      } 
    }

    fetchPizza();
    
  }, []);

  if (!pizza) {
    return <>'Загрузка ...'</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, rem.</p>
      <h4>{pizza.price} руб.</h4>
    </div>
  )
}