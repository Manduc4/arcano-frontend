import { Container, Stack, Typography } from "@mui/material";

const View = () => {
  return (
    <Container
      component={Stack}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography variant="h1" align="center">
        Seja bem vindo!
      </Typography>
    </Container>
  );
};

export default View;
