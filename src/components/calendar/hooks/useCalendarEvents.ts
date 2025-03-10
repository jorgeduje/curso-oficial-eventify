import { useCallback, useEffect, useState } from "react";
import { CalendarEvent } from "../../../types";
import { eventServices } from "../../../services/eventServices";
import { toast } from "sonner";

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await eventServices.getEvents();
      setEvents(data);
    } catch (error) {
      console.error("error al cargar eventos", error);
      toast.error("error al cargar eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    loading,
    events,
  };
};
