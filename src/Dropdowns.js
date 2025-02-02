import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

export const WeaponDropdown = (
  { weapon, setWeapon }
) => {

  const handleChange = (event) => {
    setWeapon(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="weapon-select">Weapon</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="weapon-select"
          value={weapon}
          label="Weapon"
          onChange={handleChange}
        >
          <MenuItem value={'Any Legal Weapon'}>Any Legal Weapon</MenuItem>
          <MenuItem value={'Muzzleloader'}>Muzzleloader</MenuItem>
          <MenuItem value={'Archery'}>Archery</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export const ResidentDropdown = (
  { resident, setResident }
) => {

  const handleChange = (event) => {
    setResident(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="resident-select">Resident</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="resident-select"
          value={resident}
          label="Resident"
          onChange={handleChange}
        >
          <MenuItem value={true}>true</MenuItem>
          <MenuItem value={false}>false</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export const PointsTextField = (
  { points, setPoints }
) => {
  const [pointsErr, setPointsErr] = React.useState("");


  const handleChangePoints = (event) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 22)) {
      setPointsErr(false);
      setPoints(value);
    } else {
      setPointsErr(true);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <TextField
          id="standard-basic"
          label="Points"
          error={pointsErr}
          alignItems={"center"}
          justifyContent={"center"}
          variant="standard"
          value={points}
          onChange={handleChangePoints}
        />
      </FormControl>
    </Box>
  );
};
