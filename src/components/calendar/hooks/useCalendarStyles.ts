import { Theme } from "@mui/material";

export const useCalendarStyles = (theme: Theme, isMobile: boolean) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      // Evitar el focus outline a nivel global para los elementos del calendario
      "& .fc *:focus": {
        outline: "none !important",
      },
    },
    paper: {
      p: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 1,
      backgroundColor: "background.paper",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    calendarContainer: {
      flexGrow: 1,
      "& .fc": {
        // FullCalendar root element
        height: "100%",
        fontFamily: theme.typography.fontFamily,

        "& .fc-toolbar-title": {
          // Título del calendario
          fontSize: "1.25rem",
          fontWeight: 600,
        },

        "& .fc-button": {
          // Botones de navegación
          borderRadius: 1,
          textTransform: "capitalize",
          fontWeight: 500,
          boxShadow: "none",
          padding: "6px 12px",
          outline: "none", // Eliminar outline

          "&:focus": {
            boxShadow: "none",
            outline: "none", // Eliminar outline al enfocar
          },

          "&:active": {
            outline: "none", // Eliminar outline al hacer clic
            boxShadow: "none",
          },

          // Mejorar el estilo del botón activo
          "&.fc-button-active": {
            backgroundColor: "primary.dark",
            boxShadow: "none",
            outline: "none",

            "&:focus, &:active": {
              outline: "none",
            },
          },
        },

        "& .fc-button-primary": {
          // Botones principales
          backgroundColor: "primary.main",

          "&:hover": {
            backgroundColor: "primary.dark",
          },
        },

        "& .fc-day": {
          // Días del calendario
          transition: "background-color 0.15s ease-in-out",

          "&:hover": {
            backgroundColor: "rgba(98, 0, 234, 0.04)",
            cursor: "pointer",
          },
        },

        "& .fc-day-today": {
          // Día actual
          backgroundColor: "rgba(98, 0, 234, 0.08) !important",
        },

        "& .fc-event": {
          // Eventos
          borderRadius: "4px",
          borderWidth: 0,
          padding: "4px",
          backgroundColor: "primary.main",
          transition: "transform 0.15s ease-in-out",

          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          },
        },

        "& .fc-daygrid-day-number": {
          // Números de día
          fontWeight: 500,
        },

        "& .fc-list-event:hover td": {
          // Hover en lista de eventos
          backgroundColor: "rgba(98, 0, 234, 0.04)",
        },
        "& .fc-toolbar": {
          flexWrap: "wrap",
          gap: { xs: 1, sm: 0 },

          "& .fc-toolbar-chunk": {
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-start" },
            margin: { xs: "0 auto", sm: 0 },
            width: { xs: isMobile ? "100%" : "auto", sm: "auto" },
            order: { xs: 2, sm: 0 }, // Reordenar en móvil
          },

          "& .fc-toolbar-title": {
            fontSize: { xs: "1rem", sm: "1.25rem" },
            textAlign: "center",
            width: { xs: "100%", sm: "auto" },
            margin: { xs: "8px 0", sm: 0 },
            order: { xs: 1, sm: 0 },
          },

          "& .fc-button": {
            padding: { xs: "4px 8px", sm: "6px 12px" },
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          },

          "& .fc-today-button": {
            marginLeft: { xs: 1, sm: 2 },
          },
        },

        // Botones de navegación más pequeños en móvil
        "& .fc-prev-button, & .fc-next-button": {
          width: { xs: 32, sm: "auto" },
          height: { xs: 32, sm: "auto" },
          minWidth: { xs: 32, sm: "auto" },
        },

        // Botones de vista más compactos en móvil
        "& .fc-button-group": {
          gap: { xs: 1, sm: 0 },

          "& .fc-button": {
            padding: { xs: "3px 6px", sm: "6px 12px" },

            // Prevenir el efecto de outline del navegador al hacer clic
            "&:focus-visible": {
              outline: "none",
            },
          },
        },
      },
    },
    eventContent: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      fontSize: isMobile ? "0.75rem" : "0.875rem",
      color: "white",
      p: isMobile ? 0.5 : 1,
    },
  };

  return styles;
};
