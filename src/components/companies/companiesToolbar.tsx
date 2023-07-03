import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';

const CompaniesToolbar = (props: any) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Produtos
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<UploadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Importar
        </Button>
        <Button
          startIcon={(<DownloadIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Exportar
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Adicionar Produtos
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
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
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

export default CompaniesToolbar;