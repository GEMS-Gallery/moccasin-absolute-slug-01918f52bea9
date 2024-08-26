import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const CalculatorButton = styled(Button)(({ theme }) => ({
  fontSize: '1.5rem',
  padding: theme.spacing(2),
}));

const OperationButton = styled(CalculatorButton)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  '&:hover': {
    backgroundColor: theme.palette.warning.dark,
  },
}));

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperationClick = (op: string) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setOperation(op);
      setDisplay('0');
    } else {
      handleEqualsClick();
      setOperation(op);
    }
  };

  const handleEqualsClick = async () => {
    if (firstOperand !== null && operation) {
      setLoading(true);
      try {
        const result = await backend.calculate(operation, firstOperand, parseFloat(display));
        if (result !== null) {
          setDisplay(result.toString());
          setFirstOperand(null);
          setOperation(null);
        } else {
          setDisplay('Error');
        }
      } catch (error) {
        console.error('Calculation error:', error);
        setDisplay('Error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={display}
            InputProps={{
              readOnly: true,
              sx: { fontSize: '2rem', textAlign: 'right' },
            }}
          />
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                marginTop: '-12px',
              }}
            />
          )}
        </Box>
        <Grid container spacing={1} mt={2}>
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
            <Grid item xs={3} key={num}>
              <CalculatorButton
                fullWidth
                variant="contained"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </CalculatorButton>
            </Grid>
          ))}
          <Grid item xs={3}>
            <OperationButton
              fullWidth
              variant="contained"
              onClick={() => handleOperationClick('add')}
            >
              +
            </OperationButton>
          </Grid>
          <Grid item xs={3}>
            <OperationButton
              fullWidth
              variant="contained"
              onClick={() => handleOperationClick('subtract')}
            >
              -
            </OperationButton>
          </Grid>
          <Grid item xs={3}>
            <OperationButton
              fullWidth
              variant="contained"
              onClick={() => handleOperationClick('multiply')}
            >
              ×
            </OperationButton>
          </Grid>
          <Grid item xs={3}>
            <OperationButton
              fullWidth
              variant="contained"
              onClick={() => handleOperationClick('divide')}
            >
              ÷
            </OperationButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleClear}
            >
              C
            </CalculatorButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEqualsClick}
            >
              =
            </CalculatorButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
