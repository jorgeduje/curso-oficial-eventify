import { ChangeEvent, useRef, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PhotoCamera } from "@mui/icons-material";
import { toast } from "sonner";
import { supabase } from "../../services/supabaseClient";
const Settings = () => {
  const { user, updateUserMetadata } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

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
                  ? user?.user_metadata?.full_name.chartAt(0).toUpperCase()
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
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;
