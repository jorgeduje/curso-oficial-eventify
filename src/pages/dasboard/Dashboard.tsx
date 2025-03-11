import { useEffect, useState } from "react";
import { CalendarEvent, EventStats } from "../../types";
import { eventServices } from "../../services/eventServices";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CalendarMonth, Event } from "@mui/icons-material";
import EventsLinearChart from "../../components/charts/EventsLinearChart";
import EventsPieChart from "../../components/charts/EventsPieChart";
const Dashboard = () => {
  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchDashboarData();
  }, []);

  const fetchDashboarData = async () => {
    try {
      const stats = await eventServices.getEventStats();
      const todayEvents = await eventServices.getTodayEvents();
      setEventStats(stats);
      setEvents(todayEvents);
    } catch (error) {
      console.error("Error al cargar los datos", error);
    }
  };

  const getChartData = () => {
    if (!eventStats) return [];

    // Ordenar por fecha
    return Object.entries(eventStats.monthlyStats)
      .map(([monthYear, count]) => {
        const [year, month] = monthYear.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return {
          month: date.toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          }),
          eventos: count,
          monthYear, // Para ordenar
        };
      })
      .sort((a, b) => {
        // Ordenar cronológicamente
        return a.monthYear.localeCompare(b.monthYear);
      });
  };

  const chartData = getChartData();

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component={"h1"}
        fontWeight={"bold"}
        sx={{ mb: 4 }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarMonth
                  sx={{ fontSize: 32, color: "primary.light", mr: 1 }}
                />
                <Typography fontWeight={"bold"} variant="h6">
                  Eventos Hoy
                </Typography>
              </Box>
              <>
                <Typography
                  variant="h3"
                  fontWeight={"bold"}
                  color="primary.light"
                >
                  {events.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {events.length > 0
                    ? "Eventos programados hoy"
                    : "No tienes eventos hoy"}
                </Typography>
              </>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Event sx={{ fontSize: 32, color: "primary.light", mr: 1 }} />
                <Typography fontWeight={"bold"} variant="h6">
                  Eventos
                </Typography>
              </Box>
              <>
                <Typography
                  variant="h3"
                  fontWeight={"bold"}
                  color="primary.light"
                >
                  {eventStats?.totalEvents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Eventos Creados
                </Typography>
              </>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EventsLinearChart chartData={chartData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EventsPieChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
