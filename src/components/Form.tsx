import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

interface GeocodingResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
  countryCode?: string;
}

function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function Form(): React.JSX.Element {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState<Date | null>(new Date());

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  const [lat, lng] = useUrlPosition();

  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityName(): Promise<void> {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

        if (!res.ok) {
          throw new Error("Failed getting location data");
        }

        const data: GeocodingResponse = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "This location is not a city. Please click somewhere else 😊",
          );
        }

        setCityName(
          data.city ??
            data.locality ??
            data.principalSubdivision ??
            "Unknown location",
        );

        setCountry(data.countryName ?? "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    void fetchCityName();
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!cityName || !date || !lat || !lng) return;

    await createCity({
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    });

    navigate("/app/cities");
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat || !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>

        <input
          id="cityName"
          value={cityName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCityName(e.target.value)
          }
        />

        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(selectedDate: Date | null) => setDate(selectedDate)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>

        <textarea
          id="notes"
          value={notes}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setNotes(e.target.value)
          }
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
