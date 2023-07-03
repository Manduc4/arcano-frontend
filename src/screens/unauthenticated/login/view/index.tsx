import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Link,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "../../../../services/store";
import {
  fetchLogin,
  stopLoading,
} from "../../../../services/store/slices/auth";

const View = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = useSelector((state: any) => state.Auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido.")
      .max(255)
      .required("O Email é obrigatório."),
    password: Yup.string().max(255).required("A Senha é obrigatória."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        const response: any = await dispatch(fetchLogin(payload));
        if (response.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(response.payload.message, { variant: "success" });
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
                Login
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Faça o login para acessar a plataforma
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                  disabled
                >
                  Login com o Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                  disabled
                >
                  Login com o Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                ou login com email
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
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Senha"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
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
                Fazer Login
              </LoadingButton>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Não possui uma conta?{" "}
              <Link
                href="/cadastro"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Registre-se
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default View;
