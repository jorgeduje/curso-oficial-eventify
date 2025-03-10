import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Edit, PhotoCamera, Save } from "@mui/icons-material";
import { toast } from "sonner";
import { supabase } from "../../services/supabaseClient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../validations/schemas";
import { ProfileFormValues } from "../../types";

const Settings = () => {
  const { user, updateUserMetadata } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      reset({
        full_name: metadata.full_name || "",
        phone: metadata.phone || "",
      });
      if (metadata.avatar_url) {
        setAvatarUrl(metadata.avatar_url);
      }
    }
  }, [user, reset]);

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);
      if (!user) return;
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error } = supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });
      if (error) {
        console.error("error al cargar", error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      setAvatarUrl(publicUrl);

      const { error: updateError } = await updateUserMetadata({
        avatar_url: publicUrl,
      });
      if (updateError) {
        console.error(
          "ocurrio un error al actualizar los metadatos",
          updateError
        );
        throw updateError;
      }
      toast.success("foto actualizada correctamente");
    } catch (error) {
      console.error("error al subir el avatar", error);
      toast.error("error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        toast.error("por favor selecciona una imagen valida");
        return;
      }
      if (file.size > 5 * 1024 * 2024) {
        toast.error("la imagen no debe superar los 5mb");
        return;
      }
      uploadAvatar(file);
    }
  };

  const onsubmit = async (data: ProfileFormValues) => {
    try {
      if (!user) return;

      const { error } = await updateUserMetadata({
        full_name: data.full_name,
        phone: data.phone,
      });
      if (error) {
        console.error("ocurrio un error al actualizar el perfil");
        throw error;
      }
      toast.success("perfil actualizado correctamente");
      setEditing(false);
    } catch (error) {
      console.error("ocurrio un error al actualizar el perfil", error);
      toast.error("error al actualizar el perfil");
    }
  };
  const handleEditingToggle = () => {
    if (editing) {
      handleSubmit(onsubmit)();
    } else {
      setEditing(true);
    }
  };
  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" fontWeight={"bold"} mb={4}>
        Configuración de la cuenta
      </Typography>
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          mb: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", mb: 2 }}>
              <Avatar
                src={avatarUrl || undefined}
                sx={{
                  width: 150,
                  height: 150,
                  border: "4px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.01)",
                  cursor: "pointer",
                }}
              >
                {user?.user_metadata?.full_name
                  ? user?.user_metadata?.full_name?.charAt(0).toUpperCase()
                  : "?"}
              </Avatar>
              {uploading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "50%",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <CircularProgress color="secondary" />
                </Box>
              )}
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.01)",
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
                onClick={handleAvatarClick}
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexDirection: { xs: "column", sm: "row" },
                  gap: "10px",
                }}
              >
                <Typography variant="h6" fontWeight={"medium"}>
                  Informacion general
                </Typography>
                <Button
                  variant={editing ? "contained" : "outlined"}
                  startIcon={editing ? <Save /> : <Edit />}
                  disabled={isSubmitting}
                  onClick={handleEditingToggle}
                >
                  {editing ? "Guardar" : "Editar"}
                </Button>
              </Box>
              <Divider />
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Controller
                    name="full_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Nombre completo"
                        disabled={!editing || isSubmitting}
                        variant="outlined"
                        error={!!errors.full_name}
                        helperText={errors.full_name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Correo electronico"
                    disabled={true}
                    value={user?.email || ""}
                    variant="outlined"
                    helperText={"El correo no se puede cambiar"}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Telefono"
                        disabled={!editing || isSubmitting}
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
