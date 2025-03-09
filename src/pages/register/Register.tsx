import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterFormValues } from "../../types";
import { registerSchema } from "../../validations/schemas";
import { useAuth } from "../../context/auth/useAuth";
import { toast } from "sonner";
import { Link as RouterLink } from "react-router";
import Grid from "@mui/material/Grid2";
const Register = () => {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password);
      if (error) {
        toast.error("el registro salio mal");
        return;
      }
      setSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error("ocurrio un problema, volve a intentar");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
                Registro exitoso
              </Typography>
              <Typography
                component={"h4"}
                variant="body2"
                color="text.secondary"
              >
                Revisa tu correo y verifica tu cuenta
              </Typography>
            </Box>
            <Grid container justifyContent={"center"}>
              <Grid>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Inicia sesion
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    );
  }

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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  type={showPassword ? "text" : "password"}
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
                "Registrate"
              )}
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid>
                <Link component={RouterLink} to="/login" variant="body2">
                  ¿Ya tenes cuenta? Inicia sesion
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
