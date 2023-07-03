import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

const SettingsNotifications = (props: any) => (
  <form {...props}>
    <Card>
      <CardHeader subheader="Gerenciar as notificações" title="Notificações" />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Notificações
            </Typography>
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Email"
            />
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Notificações via push"
            />
            <FormControlLabel control={<Checkbox />} label="Text Messages" />
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Chamadas"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
          >
            <Typography color="textPrimary" gutterBottom variant="h6">
              Mensagens
            </Typography>
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Email"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Notificações via push"
            />
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="Chamadas"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" variant="contained">
          Salvar
        </Button>
      </Box>
    </Card>
  </form>
);

export default SettingsNotifications;
