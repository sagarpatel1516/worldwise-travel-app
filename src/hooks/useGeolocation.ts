import { useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

interface UseGeolocationReturn {
  isLoading: boolean;
  position: Position | null;
  error: string | null;
  getPosition: () => void;
}

export function useGeolocation(
  defaultPosition: Position | null = null,
): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition(): void {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setError(null);
        setIsLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setIsLoading(false);
      },
    );
  }

  return {
    isLoading,
    position,
    error,
    getPosition,
  };
}