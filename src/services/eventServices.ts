import { CalendarEvent, EventDTO } from "../types";
import { supabase } from "./supabaseClient";

export const eventServices = {
  async getEvents(): Promise<CalendarEvent[]> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) throw error;
    return (data as EventDTO[]).map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
      description: event.desciption || "",
    }));
  },
  async createEvent(event: CalendarEvent): Promise<EventDTO> {
    const adjustedStart = new Date(event.start);
    const adjustedEnd = new Date(event.end);

    adjustedStart.setHours(adjustedStart.getHours() - 3);
    adjustedEnd.setHours(adjustedEnd.getHours() - 3);

    const eventData = {
      title: event.title,
      description: event.description || "",
      start_time: adjustedStart.toISOString(),
      end_time: adjustedEnd.toISOString(),
    };
    const { data, error } = await supabase
      .from("events")
      .insert(eventData)
      .select();
    if (error) throw error;
    return (data as EventDTO[])[0];
  },

  async updateEvent(
    event: CalendarEvent,
    skipTimeZoneAdjustment = false
  ): Promise<EventDTO> {
    if (!event.id) throw new Error("el evento debe tener un id ");
    const adjustedStart = new Date(event.start);
    const adjustedEnd = new Date(event.end);

    if (!skipTimeZoneAdjustment) {
      adjustedStart.setHours(adjustedStart.getHours() - 3);
      adjustedEnd.setHours(adjustedEnd.getHours() - 3);
    }

    const eventData: Partial<EventDTO> = {
      title: event.title,
      desciption: event.description || "",
      start_time: adjustedStart.toISOString(),
      end_time: adjustedEnd.toISOString(),
    };

    const { data, error } = await supabase
      .from("events")
      .update(eventData)
      .eq("id", event.id)
      .select();

    if (error) throw error;

    return (data as EventDTO[])[0];
  },

  async deleteEvent(eventId: string): Promise<boolean> {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) throw error;

    return true;
  },

  async getEventById(eventId: string): Promise<CalendarEvent> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (error) throw error;

    const event = data as EventDTO;

    return {
      id: event.id,
      title: event.title,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
      description: event.desciption || "",
    };
  },
};
