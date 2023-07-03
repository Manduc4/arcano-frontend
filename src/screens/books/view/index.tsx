import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import BooksToolbar from "../../../components/books/booksToolbar";
import BooksResults from "../../../components/books/booksResults";
import { customers } from "../../../__mocks__/customers";
import { useDispatch } from "../../../services/store";
import { fetchUserList } from "../../../services/store/actions/users";
import { useSnackbar } from "notistack";

const View = () => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const getUsers = async () => {

    try {
      const response: any = await dispatch(fetchUserList());
      if (response.meta.requestStatus === "fulfilled") {
        enqueueSnackbar(response.payload.message, { variant: "success" });
        console.log(response);
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
          <BooksToolbar />
          <Box sx={{ mt: 3 }}>
            <BooksResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default View;
