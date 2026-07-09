import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  ReactNode,
} from "react";

const BASE_URL = "http://localhost:9000";

export interface City {
  id: number;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
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
  getCity: (id: number | string) => Promise<void>;
  createCity: (newCityData: Omit<City, "id">) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

interface CitiesProviderProps {
  children: ReactNode;
}

type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: City[] }
  | { type: "city/loaded"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: number }
  | { type: "rejected"; payload: string };

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

function reducer(
  state: CitiesState,
  action: CitiesAction,
): CitiesState {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
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

function CitiesProvider({
  children,
}: CitiesProviderProps): React.JSX.Element {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Failed to fetch cities");

        const data: City[] = await res.json();

        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id: number | string): Promise<void> => {
      if (Number(id) === currentCity?.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);

        if (!res.ok) throw new Error("Failed to fetch city");

        const data: City = await res.json();

        dispatch({
          type: "city/loaded",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    },
    [currentCity?.id],
  );

  async function createCity(
    newCityData: Omit<City, "id">,
  ): Promise<void> {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCityData),
      });

      if (!res.ok) throw new Error("Failed to create city");

      const data: City = await res.json();

      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async function deleteCity(id: number): Promise<void> {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete city");

      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          error instanceof Error ? error.message : "Unknown error occurred",
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