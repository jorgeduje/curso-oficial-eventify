import { CalendarEvent, ChartItem, EventDTO } from "../types";
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
      description: event.description || "",
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
      description: event.description || "",
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
      description: event.description || "",
    };
  },
  async getEventStats() {
    // Obtener conteo total de eventos
    const { count, error: countError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    // Obtener eventos por mes (para gráficos)
    const { data: monthlyData, error: monthlyError } = await supabase
      .from("events")
      .select("start_time");

    if (monthlyError) throw monthlyError;

    if (!monthlyData) {
      return {
        totalEvents: count || 0,
        monthlyStats: {},
      };
    }

    // Procesamiento de datos para estadísticas mensuales
    // Definimos explícitamente el tipo del acumulador
    const monthlyStats = monthlyData.reduce<Record<string, number>>(
      (acc, event) => {
        const date = new Date(event.start_time);
        const monthYear = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }

        acc[monthYear]++;
        return acc;
      },
      {}
    );

    return {
      totalEvents: count || 0,
      monthlyStats,
    };
  },
  // Agregar a eventService.ts
  async getTodayEvents(): Promise<CalendarEvent[]> {
    try {
      // Obtener la fecha de hoy en formato ISO (YYYY-MM-DD)
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      const startISOString = startOfDay.toISOString();
      const endISOString = endOfDay.toISOString();

      // Consultar a Supabase por eventos que ocurren hoy
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("start_time", startISOString)
        .lte("start_time", endISOString)
        .order("start_time", { ascending: true });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Error al obtener eventos de hoy:", error);
      throw error;
    }
  },
  // Método simplificado para obtener estadísticas de eventos por día de la semana
  async getEventsByDayOfWeek(): Promise<ChartItem[]> {
    try {
      const { data, error } = await supabase.from("events").select("*");

      if (error) throw error;

      // Días de la semana
      const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];

      // Inicializar contador para cada día
      const dayStats: Record<string, number> = {};
      days.forEach((day) => (dayStats[day] = 0));

      // Contar eventos por día
      (data as EventDTO[]).forEach((event) => {
        const day = days[new Date(event.start_time).getDay()];
        dayStats[day] += 1;
      });

      // Colores para los días
      const colors = [
        "#ef4444", // Rojo
        "#f97316", // Naranja
        "#f59e0b", // Ámbar
        "#84cc16", // Lima
        "#06b6d4", // Cian
        "#6366f1", // Índigo
        "#a855f7", // Púrpura
      ];

      // Formatear para el gráfico
      return days.map((day, index) => ({
        name: day,
        value: dayStats[day],
        fill: colors[index],
      }));
    } catch (error) {
      console.error("Error al obtener estadísticas por día:", error);
      throw error;
    }
  },
};
