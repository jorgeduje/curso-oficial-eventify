import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { useCalendarStyles } from "../../components/calendar/hooks/useCalendarStyles";
import FullCalendar from "@fullcalendar/react";
const Calendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useCalendarStyles(theme, isMobile);
  return (
    <Box sx={styles.container}>
      <Paper elevation={0} sx={styles.paper}>
        {/* HeaderCalendar  */}
        <Box sx={styles.calendarContainer}>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: isMobile ? "prev,next" : "prev,next today",
              center: isMobile ? "" : "title",
              right: isMobile
                ? "today,dayGridMonth,listMonth"
                : "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            titleFormat={
              isMobile ? { year: "numeric", month: "short" } : undefined
            }
            initialView={isMobile ? "listMonth" : "dayGridMonth"}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            // events={events}
            // select={handleDateSelect}
            // eventClick={handleEventClick}
            // eventChange={handleEventChange}
            height="100%"
            locale={esLocale}
            viewClassNames={isMobile ? "fc-mobile-view" : ""}
            customButtons={
              isMobile
                ? {
                    title: {
                      text: new Date().toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      }),
                      click: function () {},
                    },
                  }
                : undefined
            }
            timeZone="local"
            eventContent={(eventInfo) => (
              <Box sx={styles.eventContent}>
                {eventInfo.event.start && (
                  <span>
                    {eventInfo.event.start.toISOString().slice(11, 16)}
                  </span>
                )}
                <span>{eventInfo.event.title}</span>
              </Box>
            )}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Calendar;
