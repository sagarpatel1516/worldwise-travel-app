import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  ReactNode,
} from "react";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";

export interface City {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string | { toDate: () => Date };
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface CitiesState {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
}

interface CitiesContextType {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
  getCity: (id: string) => Promise<void>;
  createCity: (newCityData: Omit<City, "id">) => Promise<boolean>;
  deleteCity: (id: string) => Promise<void>;
}

interface CitiesProviderProps {
  children: ReactNode;
}

type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: City[] }
  | { type: "city/loaded"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

function reducer(state: CitiesState, action: CitiesAction): CitiesState {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }: CitiesProviderProps): React.JSX.Element {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // GET ALL CITIES FROM FIRESTORE
  useEffect(() => {
    async function fetchCities(): Promise<void> {
      dispatch({ type: "loading" });

      try {
        const querySnapshot = await getDocs(collection(db, "cities"));

        const data: City[] = querySnapshot.docs.map((item) => {
          const cityData = item.data() as {
            cityName: string;
            country: string;
            emoji: string;
            date: Timestamp | string;
            notes: string;
            position: {
              lat: number;
              lng: number;
            };
          };

          return {
            id: item.id,
            cityName: cityData.cityName,
            country: cityData.country,
            emoji: cityData.emoji,
            date:
              cityData.date instanceof Timestamp
                ? cityData.date.toDate().toISOString()
                : cityData.date,
            notes: cityData.notes,
            position: {
              lat: Number(cityData.position.lat),
              lng: Number(cityData.position.lng),
            },
          };
        });

        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            error instanceof Error ? error.message : "Failed to load cities",
        });
      }
    }

    void fetchCities();
  }, []);

  const getCity = useCallback(
    async (id: string): Promise<void> => {
      if (id === currentCity?.id) return;

      dispatch({ type: "loading" });

      try {
        const cityRef = doc(db, "cities", id);

        const citySnap = await getDoc(cityRef);

        if (!citySnap.exists()) {
          throw new Error("City not found");
        }

        const cityData = citySnap.data() as {
          cityName: string;
          country: string;
          emoji: string;
          date: Timestamp | string;
          notes: string;
          position: {
            lat: number;
            lng: number;
          };
        };

        const city: City = {
          id: citySnap.id,
          cityName: cityData.cityName,
          country: cityData.country,
          emoji: cityData.emoji,
          date:
            cityData.date instanceof Timestamp
              ? cityData.date.toDate().toISOString()
              : cityData.date,
          notes: cityData.notes,
          position: {
            lat: Number(cityData.position.lat),
            lng: Number(cityData.position.lng),
          },
        };

        dispatch({
          type: "city/loaded",
          payload: city,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            error instanceof Error ? error.message : "Failed to get city",
        });
      }
    },
    [currentCity?.id],
  );
  async function createCity(newCityData: Omit<City, "id">): Promise<boolean> {
    dispatch({ type: "loading" });

    try {
      const docRef = await addDoc(collection(db, "cities"), {
        cityName: newCityData.cityName,
        country: newCityData.country,
        emoji: newCityData.emoji,
        date:
          typeof newCityData.date === "string"
            ? Timestamp.fromDate(new Date(newCityData.date))
            : newCityData.date,
        notes: newCityData.notes,
        position: {
          lat: newCityData.position.lat,
          lng: newCityData.position.lng,
        },
      });

      const newCity: City = {
        ...newCityData,
        id: docRef.id,
      };

      dispatch({
        type: "city/created",
        payload: newCity,
      });

      return true;
    } catch (error) {
      console.error("Firebase CREATE ERROR:", error);

      dispatch({
        type: "rejected",
        payload:
          error instanceof Error ? error.message : "Failed to create city",
      });

      return false;
    }
  }
  async function deleteCity(id: string): Promise<void> {
    dispatch({ type: "loading" });

    try {
      await deleteDoc(doc(db, "cities", id));

      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          error instanceof Error ? error.message : "Failed to delete city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(): CitiesContextType {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

export { CitiesProvider, useCities };
