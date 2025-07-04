// src/hooks/useLocation.ts
import { useState, useEffect } from "react";
import { LocationData, getCurrentLocation } from "../services/location";
import { LocationModel, OutputLocationType } from "../types/locationTypes";

interface UseLocationResult {
  location: OutputLocationType | null;
  loading: boolean;
  error: Error | null;
}

export const useLocationHook = (): UseLocationResult => {
  const [location, setLocation] = useState<OutputLocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getCurrentLocation();
        setLocation({
          ...data,
          longitude: data.longitude,
          latitude: data.latitude,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to get location")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};
