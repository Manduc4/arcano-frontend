import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PATH_APP } from "../../../routes/paths";

const View = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: A página que você procura não está aqui
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            Você tentou alguma rota errada ou veio aqui por engano. Seja o que
            for, tente usar a navegação
          </Typography>
          <Button
            component={Link}
            to={PATH_APP.home}
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Voltar para a Home
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default View;
