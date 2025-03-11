import { FC } from "react";
import { EventFormProps } from "../../types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const EventForm: FC<EventFormProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  isEditing,
  loading,
  onDelete,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: { borderRadius: 1, overflow: "hiden" },
        },
      }}
      aria-labelledby="form-dialog-title"
      keepMounted={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{ backgroundColor: "primary.main", color: "white", py: 2 }}
        >
          {isEditing ? "Editar evento" : "Nuevo evento"}
        </DialogTitle>
        <DialogContent
          sx={{
            p: "20px",
            mt: 1,
            paddingTop: "20px !important",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="titulo"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="start"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Inicio"
                  value={field.value}
                  onChange={(newValue) => {
                    if (newValue) field.onChange(newValue);
                  }}
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!errors.start,
                      helperText: errors.start?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="end"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Fin"
                  value={field.value}
                  onChange={(newValue) => {
                    if (newValue) field.onChange(newValue);
                  }}
                  ampm={false}
                  format="dd/MM/yyyy HH:mm"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!errors.end,
                      helperText: errors.end?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ px: 3, py: 2, backgroundColor: "background.default" }}
        >
          {isEditing && onDelete && (
            <Button
              onClick={onDelete}
              sx={{ borderRadius: 1, mr: "auto" }}
              color="error"
              variant="outlined"
            >
              Eliminar
            </Button>
          )}
          <Button onClick={onClose} sx={{ fontWeight: 500 }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ fontWeight: 500, px: 3 }}
          >
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
