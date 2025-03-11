import { FC } from "react";
import { EventFormProps } from "../../types";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
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
        <DialogContent>
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
          {/* <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}> */}
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
          {/* </LocalizationProvider> */}

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
        </DialogContent>
      </form>
    </Dialog>
  );
};
