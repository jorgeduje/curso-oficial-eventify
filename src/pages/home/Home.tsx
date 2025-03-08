import { Button } from "@mui/material";
import { useAuth } from "../../context/auth/useAuth";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>Ya estoy en el home</h1>
      <Button variant="contained" onClick={signOut}>
        cerrar sesion
      </Button>
    </div>
  );
};

export default Home;
