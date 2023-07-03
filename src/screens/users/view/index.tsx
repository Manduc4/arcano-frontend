import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { useDispatch } from "../../../services/store";
import { fetchUserList } from "../../../services/store/actions/users";
import { useSnackbar } from "notistack";
import { getInitials } from "../../../utils/get-initials";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Search as SearchIcon } from "../../../icons/search";
import { Upload as UploadIcon } from "../../../icons/upload";
import { Download as DownloadIcon } from "../../../icons/download";

const View = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const getUsers = async () => {
    try {
      const response: any = await dispatch(fetchUserList());
      if (response.meta.requestStatus === "fulfilled") {
        setUserList(response.payload)
      } else {
        enqueueSnackbar("Ocorreu um erro.", { variant: "error" });
      }
    } catch (error: any) {
      enqueueSnackbar("Ocorreu um erro.", { variant: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const Header = () => {
    return (
      <Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            Usuarios
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
              Importar
            </Button>
            <Button
              startIcon={<DownloadIcon fontSize="small" />}
              sx={{ mr: 1 }}
            >
              Exportar
            </Button>
            <Button color="primary" variant="contained">
              Adicionar Usuario
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Pesquisar"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  };

  const UsersTable = () => {
    return (
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      // checked={selectedCustomerIds.length === customers.length}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Aniversario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user: any) => (
                  <TableRow
                    hover
                    key={user.id}
                    // selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        // checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        // onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={user.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(user.name)}
                        </Avatar> */}
                        <Typography color="textPrimary" variant="body1">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    {/* <TableCell>
                      {`${user.address.city}, ${user.address.state}, ${user.address.country}`}
                    </TableCell> */}
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell>{user.phone}</TableCell> */}
                    <TableCell>
                      {/* {format(user.createdAt, "dd/MM/yyyy")} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <TablePagination
          // component="div"
          count={customers.length}
          onPageChange={() => {}}
          // onRowsPerPageChange={handleLimitChange}
          // page={page}
          // rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
    );
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Header />
          <Box sx={{ mt: 3 }}>
            <UsersTable />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default View;
