import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormValues } from "../../types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { toast } from "sonner";
import { loginSchema } from "../../validations/schemas";
import { Link as RouterLink } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast.error("Error, revisa las credenciales");
      }
    } catch (error) {
      console.log(error);
      toast.error("algo salio mal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 3,
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: "100%",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <CalendarMonthIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography component={"h2"} variant="h5" fontWeight={"bold"}>
              Eventify curso
            </Typography>
            <Typography component={"h4"} variant="body2" color="text.secondary">
              Inicia sesión en tu cuenta
            </Typography>
          </Box>
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Correo electrónico"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ my: 3, mb: 2, py: 1 }}
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Iniciar sesion"
              )}
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid>
                <Link component={RouterLink} to="/register" variant="body2">
                  ¿No tienes cuenta? Registrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
