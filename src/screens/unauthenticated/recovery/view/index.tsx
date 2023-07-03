import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "../../../../services/store";
import { stopLoading } from "../../../../services/store/slices/auth";
import { useNavigate } from "react-router-dom";
import { fetchRecovery } from "../../../../services/store/actions/users";

const View = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { loading } = useSelector((state: any) => state.Auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido.")
      .max(255)
      .required("O Email é obrigatório."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
      };

      try {
        const response: any = await dispatch(fetchRecovery(payload));
        if (response.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(response.payload.message, { variant: "success" });
          navigate("/login");
        } else {
          enqueueSnackbar(response.payload.message, { variant: "error" });
        }
      } catch (error: any) {
        dispatch(stopLoading());
        enqueueSnackbar("Ocorreu um erro.", { variant: "error" });
        console.log(error);
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Esqueceu a senha?
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Um email com uma nova senha será enviado a você
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <Box sx={{ py: 2 }}>
              <LoadingButton
                loading={loading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Recuperar senha
              </LoadingButton>
            </Box>
            <Button onClick={() => navigate(-1)} color="primary" size="large">
              Voltar
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default View;
