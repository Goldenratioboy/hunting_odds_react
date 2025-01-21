import * as React from "react";

import { WeaponDropdown, ResidentDropdown, PointsTextField } from "./Dropdowns";
import { Box, Button, Grid, Typography } from "@mui/material";

import { getOdds } from "./materials/getOdds.js"

function App() {

  const [weapon, setWeapon] = React.useState("");
  const [resident, setResident] = React.useState("");
  const [points, setPoints] = React.useState("");
  const [result, setResult] = React.useState([]);

  const submitButtonOnClick = (
    weapon,
    resident,
    points,
  ) => {
    const computedOdds = getOdds('Deer', weapon, resident, points)
    setResult(computedOdds)
  };
  React.useEffect(() => console.log(result), [result]);

  return (
    <>
    <Box sx={{ minWidth: 120, display:"flex", justifyContent:"center" }}>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 1, md: 1 }} sx={{p:1}}>
        <Grid item xs={8}>
          <Typography variant="h2">Tim's Hunting Wheel of Fortune</Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} sx={{p:2}}>
          <WeaponDropdown weapon={weapon} setWeapon={setWeapon} />
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={4} sx={{p:2}}>
          <ResidentDropdown resident={resident} setResident={setResident}/>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={4} sx={{p:2}}>
          <PointsTextField points={points} setPoints={setPoints}/>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={8}>
          <Button variant="contained" onClick={() => submitButtonOnClick(weapon, resident, points)}>Submit</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">
            {result.map((hunt) => (
              <div key={hunt.id}>
                <p>{hunt.id}: {hunt.name} - {hunt.percentage}%</p>
              </div>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default App;
