import { FC } from "react";
import { DeleteConfirmationProps } from "../../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1,
            overflow: "hidden",
          },
        },
      }}
      aria-labelledby="delete-dialog-title"
      keepMounted={false}
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{
          bgcolor: "error.light",
          color: "error.contrastText",
          py: 2,
        }}
      >
        Confirmar eliminacion
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Typography sx={{ mt: 1, textAlign: "center" }}>
          ¿Estas seguro de que deseas eliminar este evento?
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, textAlign: "center" }}
        >
          Esta accion no se puede deshacer
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 500 }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{ borderRadius: 1, fontWeight: 500 }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
