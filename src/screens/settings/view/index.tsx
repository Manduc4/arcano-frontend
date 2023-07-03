import { Box, Container, Typography } from "@mui/material";
import SettingsNotifications from "../../../components/settings/settingsNotifications";
import SettingsPassword from "../../../components/settings/settingsPassword";
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
          Configurações
        </Typography>
        {/* <SettingsNotifications /> */}
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default View;
