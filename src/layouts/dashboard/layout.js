import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "./sideNav";
import { TopNav } from "./topNav";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
  overflow: "hidden",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
});

export const Layout = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <Container>
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Container>
      </LayoutRoot>
    </>
  );
};
