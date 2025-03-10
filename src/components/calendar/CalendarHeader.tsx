import { FC } from "react";
import { CalendarHeaderProps } from "../../types";
import { Box, Button, Typography } from "@mui/material";

export const CalendarHeader: FC<CalendarHeaderProps> = ({ onNewEvent }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant="h5"
        component={"h2"}
        fontWeight={"bold"}
        sx={{
          color: "text.primary",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Mis eventos
      </Typography>
      <Button
        variant="contained"
        onClick={onNewEvent}
        sx={{
          borderRadius: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 0.75, sm: 1 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Nuevo evento
      </Button>
    </Box>
  );
};
