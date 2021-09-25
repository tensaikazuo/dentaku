import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  screen: {
    height: '30px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  },
  container: {
    width: '304px',
    margin: '0 auto',
    padding : '16px 0',
  }
});

export const App = () => {
  const classes = useStyles();
  const [ displayState, updateDisplayState ] = useState('');
  const [ operatorState, updateOperatorState ] = useState('');
  const [ processState, updateProcessState ] = useState(0);
  const [ elementState, updateElementState] = useState('');
  const trimZero = val => {
    if (val.indexOf('.') < 0 && val.substr(0, 1) === '0') {
      return val.substr(2);
    } else {
      return val;
    }
  };
  const displayValue = val => {
    if (processState === 0) {
      if (displayState) {
        if (val !== '.') {
          updateDisplayState(trimZero(displayState) + val);
        } else {
          updateDisplayState(displayState + val);
        }
      } else {
        updateDisplayState(val);
      }
    }
  };
  const displayElement = val => {
    if (processState === 1) {
      if (elementState) {
        if (val !== '.') {
          updateElementState(trimZero(elementState) + val);
        } else {
          updateElementState(elementState + val);
        }
      } else {
        updateElementState(val);
      }
    }
  };
  const clearDisplay = () => {
    updateDisplayState('');
    updateProcessState(0);
    updateOperatorState('');
    updateElementState('');
  };
  const displayOperator = val => {
    if (!elementState) {
      updateOperatorState(val);
    }
  };
  const roundValue = val => {
    return Math.round(val * 100000000) / 100000000;
  };
  const processCalc = (val1, val2) => {
    switch (operatorState) {
      case '+':
        updateDisplayState((parseFloat(val1) + parseFloat(val2)).toString());
        updateProcessState(0);
        updateOperatorState('');
        updateElementState('');
        break;
      case '-':
        updateDisplayState((parseFloat(val1) - parseFloat(val2)).toString());
        updateProcessState(0);
        updateOperatorState('');
        updateElementState('');
        break;
      case 'x':
        updateDisplayState((parseFloat(val1) * parseFloat(val2)).toString());
        updateProcessState(0);
        updateOperatorState('');
        updateElementState('');
        break;
      case '/':
        updateDisplayState(roundValue(parseFloat(val1) / parseFloat(val2)).toString());
        updateProcessState(0);
        updateOperatorState('');
        updateElementState('');
        break;
      default:
        console.log('no such operator, sorry');
    }
  };
  return (
    <>
      <CssBaseline />
      <div className={classes.container}>
      <div className={classes.screen}>{displayState} {operatorState} {elementState}</div>
        <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
          <Button variant="contained" onClick={() => clearDisplay()}>CA</Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
          <Button
            variant="outlined"
            size="large"
            onClick={e => {
              displayValue('1');
              displayElement('1');
            }}
          >1</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('2');
              displayElement('2');
            }}
          >2</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('3');
              displayElement('3');
            }}
          >3</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '') {
                displayOperator('+');
                updateProcessState(1);
              }
            }}
          >+</Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
          <Button
            variant="outlined"
            size="large"
            onClick={e => {
              displayValue('4');
              displayElement('4');
            }}
          >4</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('5');
              displayElement('5');
            }}
          >5</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('6');
              displayElement('6');
            }}
          >6</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '') {
                displayOperator('x');
                updateProcessState(1);
              }
            }}
          >x</Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
          <Button
            variant="outlined"
            size="large"
            onClick={e => {
              displayValue('7');
              displayElement('7');
            }}
          >7</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('8');
              displayElement('8');
            }}
          >8</Button>
          <Button
            variant="outlined"
            onClick={e => {
              displayValue('9');
              displayElement('9');
            }}
          >9</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '') {
                displayOperator('/');
                updateProcessState(1);
              }
            }}
          >/</Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{marginTop: 2}}>
          <Button
            variant="outlined"
            size="large"
            onClick={e => {
              if (displayState !== '0') {
                displayValue('0');
              }
              if (elementState !== '0') {
                displayElement('0');
              }
            }}
          >0</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '' && displayState !== '0') {
                displayValue('00');
              }
              if (displayState !== '' && elementState !== '0') {
                displayElement('00');
              }
            }}
          >00</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '') {
                displayValue('.');
              }
              if (elementState !== '') {
                displayElement('.');
              }
            }}
          >.</Button>
          <Button
            variant="outlined"
            onClick={e => {
              if (displayState !== '') {
                displayOperator('-');
              }
              updateProcessState(1);
            }}
          >-</Button>
        </Stack>
        <Stack direction="row-reverse" spacing={0} sx={{marginTop: 2}}>
          <Button
            variant="outlined"
            size="large"
            onClick={e => {
              if (processState === 1 && elementState) {
                processCalc(displayState, elementState);
              }
            }}
          >=</Button>
        </Stack>
      </div>
    </>
  );
};
