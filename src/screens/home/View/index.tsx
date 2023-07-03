import { Container, Grid, Box } from "@mui/material";
import Budget from "../../../components/home/budget";
import TotalCustomers from "../../../components/home/totalCustomers";
import Sales from "../../../components/home/sales";
import TasksProgress from "../../../components/home/taskProgress";
import TotalProfit from "../../../components/home/totalProfit";
import TrafficByDevice from "../../../components/home/trafficByDevice";
import LatestProducts from "../../../components/home/latestProducts";
import LatestOrders from "../../../components/home/latestOrders";

const View = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default View;
