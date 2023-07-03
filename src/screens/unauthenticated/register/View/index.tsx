import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "../../../../services/store";
import { fetchCreateUser } from "../../../../services/store/actions/users";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = useSelector((state: any) => state.Auth);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido.")
      .max(255)
      .required("O Email é obrigatório."),
    firstName: Yup.string().max(255).required("O Primeiro Nome é obrigatório."),
    lastName: Yup.string().max(255).required("O Último Nome é obrigatório."),
    password: Yup.string().max(255).required("A Senha é obrigatória."),
    policy: Yup.boolean().oneOf([true], "Este campo deve ser marcado."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      policy: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        name: values.firstName + " " + values.lastName,
        password: values.password,
      };

      try {
        const { meta, payload }: any = await dispatch(fetchCreateUser(data));
        if (meta.requestStatus === "fulfilled") {
          enqueueSnackbar(payload.message, { variant: "success" });
          navigate("/login");
        } else {
          const errorResponse = payload as AxiosError<Error>;
          enqueueSnackbar(
            errorResponse.response?.data.message || "Ocorreu um problema.",
            { variant: "error" }
          );
        }
      } catch (error: any) {
        enqueueSnackbar("Ocorreu um erro", { variant: "error" });
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
                Crie uma nova conta
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use seu email para criar uma nova conta
              </Typography>
            </Box>
            <TextField
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Primeiro Nome"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Último Nome"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
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
              variant="outlined"
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
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                Eu li os{" "}
                {/* <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink> */}
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <LoadingButton
                loading={loading}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registrar
              </LoadingButton>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Já possui uma conta?{" "}
              <Link href="/login" variant="subtitle2" underline="hover">
                Login
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
