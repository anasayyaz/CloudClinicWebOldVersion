import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { fontSize } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const Configuration = (props) => {
    const [state, setState] = React.useState({
        p: true,
        d: true,
        lt: true,
        vs: true,
        n: true,

    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { p, d, lt, vs, n } = state;
    //   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return (
        <><Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ fontSize: "25px" }}>Report Print</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={p} onChange={handleChange} name="p" />
                        }
                        label="Prescription"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={d} onChange={handleChange} name="d" />
                        }
                        label="Diagnosis"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={vs} onChange={handleChange} name="vs" />
                        }
                        label="Vital Signs"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={lt} onChange={handleChange} name="lt" />
                        }
                        label="Lab Tests"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={n} onChange={handleChange} name="n" />
                        }
                        label="Notes"
                    />
                </FormGroup>
                <FormHelperText>Please check the options you want to show in the print layout of report.</FormHelperText>
            </FormControl>

        </Box>
            <Box sx={{ display: 'flex' }}>  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ fontSize: "25px" }}>Start Meeting Flow</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="post"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="pre" control={<Radio />} label="Pre" />
                    <FormControlLabel value="post" control={<Radio />} label="Post" />
                </RadioGroup>
                <FormHelperText>Please choose the option if you want to restrict the meeting on the intake of history and vital signs.</FormHelperText>

            </FormControl>
            </Box>
            <Box sx={{ display: 'flex' }}>  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ fontSize: "25px" }}>Payment Share</FormLabel>
                <TextField id="outlined-basic" label="Hospital" variant="outlined" className='mb-3' />
                <TextField id="outlined-basic" label="Physician" variant="outlined" />
                <FormHelperText>Please fill in the percentage (0-100) of share for payments.</FormHelperText>

            </FormControl>
            </Box>
            <Button variant="contained" style={{ alignContent: "right", textAlign: "right" }}>Save</Button>
        </>

    );
};

export default Configuration;
