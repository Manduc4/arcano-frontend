import { Box, Container, Grid, Typography } from "@mui/material";
import ProfileForm from "../../../components/profile/profileForm";
import ProfileHeader from "../../../components/profile/profileHeader";

const View = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Minha Conta
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileHeader />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default View;
