import { City } from "../contexts/CitiesContext";

import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: Pick<City, "country" | "emoji">;
}

function CountryItem({ country }: CountryItemProps): React.JSX.Element {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
