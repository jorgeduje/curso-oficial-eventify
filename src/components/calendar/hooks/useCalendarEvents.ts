import { useCallback, useEffect, useState } from "react";
import { CalendarEvent } from "../../../types";
import { eventServices } from "../../../services/eventServices";
import { toast } from "sonner";
import { EventChangeArg } from "@fullcalendar/core/index.js";

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

  const createEvent = useCallback(
    async (eventData: Omit<CalendarEvent, "id">) => {
      setLoading(true);
      try {
        await eventServices.createEvent(eventData);
        toast.success("evento creado correctamente");
        await fetchEvents();
        return true;
      } catch (error) {
        console.error("error al crear evento", error);
        toast.error("error al crear el evento");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents]
  );

  const updateEvent = useCallback(
    async (event: CalendarEvent) => {
      setLoading(true);

      try {
        await eventServices.updateEvent(event);
        toast.success("evento actualizado correctamente");
        fetchEvents();
        return true;
      } catch (error) {
        console.error("error al actualizar", error);
        toast.error("error al actualizar");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents]
  );

  const deleteEvent = useCallback(
    async (eventId: string) => {
      setLoading(true);
      try {
        await eventServices.deleteEvent(eventId);
        toast.success("evento eliminado correctamente");
        await fetchEvents();
        return true;
      } catch (error) {
        console.error("error al eliminar", error);
        toast.error("error al eliminar");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents]
  );
  const handleEventChange = useCallback(
    async (changeInfo: EventChangeArg) => {
      setLoading(true);
      const eventId = changeInfo.event.id;

      const startDate = changeInfo.event.start as Date;
      const endDate =
        (changeInfo.event.end as Date) ||
        new Date(startDate.getTime() + 60 * 60 * 1000);

      try {
        const updateEvent: CalendarEvent = {
          id: eventId,
          title: changeInfo.event.title,
          start: startDate,
          end: endDate,
          description: changeInfo.event.extendedProps?.description || "",
        };
        await eventServices.updateEvent(updateEvent, true);
        toast.success("Evento actualizado correctamente");
        fetchEvents();
      } catch (error) {
        console.error("no se pudo actualizar el evento", error);
        toast.error("no se pudo actualizar el evento");
      } finally {
        setLoading(false);
      }
    },
    [fetchEvents]
  );

  return {
    loading,
    events,
    createEvent,
    updateEvent,
    deleteEvent,
    handleEventChange,
  };
};
