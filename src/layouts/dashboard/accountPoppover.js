// import { useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "../../services/store";
import { logout, stopLoading } from "../../services/store/slices/auth";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout());

      if (response.meta.requestStatus) {
        enqueueSnackbar(response.payload.message, { varian: "success" });
      } else {
        enqueueSnackbar(response.payload.message, { varian: "error" });
        console.error(response.payload.message);
      }
    } catch (error) {
      dispatch(stopLoading());
      enqueueSnackbar('Ocorreu um erro.', { variant: "error" });
      console.log(error);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Conta</Typography>
        <Typography color="text.secondary" variant="body2">
          Caio Manduca
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <LoadingButton loading={loading}>Sair</LoadingButton>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
