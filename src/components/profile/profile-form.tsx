import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const ProfileForm = () => {
  const [values, setValues] = useState({
    firstName: 'Caio',
    lastName: 'Manduca',
    email: 'caiomanducas@gmail.com',
    phone: '',
    state: 'Mato Grosso',
    country: 'BRL'
  });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  return (
    <form
      autoComplete="off"
      noValidate
      // {...props}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Primeiro nome"
                name="firstName"
                // onChange={handleChange}
                required
                value={values.firstName}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Último nome"
                name="lastName"
                // onChange={handleChange}
                required
                value={values.lastName}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                // onChange={handleChange}
                required
                value={values.email}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Celular"
                name="phone"
                // onChange={handleChange}
                type="number"
                value={values.phone}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="País"
                name="country"
                // onChange={handleChange}
                required
                value={values.country}
                // variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                name="state"
                // onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                // variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileForm;