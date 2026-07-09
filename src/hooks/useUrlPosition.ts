import { useSearchParams } from "react-router-dom";

type UrlPosition = [string | null, string | null];

export function useUrlPosition(): UrlPosition {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}