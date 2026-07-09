import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

import { City, useCities } from "../contexts/CitiesContext";

import styles from "./CountryList.module.css";

interface Country {
  country: string;
  emoji: string;
}

function CountryList(): React.JSX.Element {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce<Country[]>((acc, city: City) => {
    if (!acc.some((item) => item.country === city.country)) {
      acc.push({
        country: city.country,
        emoji: city.emoji,
      });
    }

    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
