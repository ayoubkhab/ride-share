import React, { useState } from "react";
import {
   Paper,
   Button,
   Typography,
   MenuItem,
   Select,
   InputAdornment,
   Tooltip,
   Stack,
} from "@mui/material";
import { StyledInput } from "./StyledInput";
import {
   Person as PersonIcon,
   LocationOn as LocationIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { useSelector, useDispatch } from "react-redux";
import { getTrips } from "../features/trips/tripsSlice";

const Searchbar = (props) => {
   const [start, setStart] = useState("");
   const [destination, setDestination] = useState("");
   const [places, setPlaces] = useState(1);
   const [dateValue, setDateValue] = useState(new Date());

   const userInfo = useSelector((state) => state.users.user);
   const loadingUI = useSelector((state) => state.trips.loadingUI);
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();
      const searchInput = { start, destination };
      dispatch(getTrips(searchInput));
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "start") {
         setStart(value);
      }
      if (name === "destination") {
         setDestination(value);
      }
      if (name === "places") {
         setPlaces(value);
      }
   };

   return (
      <div>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
               sx={{
                  padding: 3,
               }}
               component="form"
               onSubmit={handleSubmit}
            >
               <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <StyledInput
                     name="start"
                     value={start}
                     onChange={handleChange}
                     placeholder="Start.."
                     startAdornment={
                        <InputAdornment position="start">
                           <LocationIcon />
                        </InputAdornment>
                     }
                  />
                  <StyledInput
                     name="destination"
                     value={destination}
                     onChange={handleChange}
                     placeholder="Destination.."
                     startAdornment={
                        <InputAdornment position="start">
                           <LocationIcon />
                        </InputAdornment>
                     }
                  />
                  <Stack direction="row" spacing={2}>
                     <DatePicker
                        placeholder="When?.."
                        value={dateValue}
                        onChange={(newDateValue) => setDateValue(newDateValue)}
                        minDate={new Date()}
                        renderInput={({
                           inputRef,
                           inputProps,
                           InputProps: { endAdornment },
                        }) => (
                           <StyledInput
                              inputRef={inputRef}
                              endAdornment={endAdornment}
                              {...inputProps}
                           />
                        )}
                     />
                     <Tooltip placement="top" title="Number of places to book">
                        <Select
                           onChange={handleChange}
                           value={places}
                           name="places"
                           input={
                              <StyledInput
                                 startAdornment={
                                    <InputAdornment position="start">
                                       <PersonIcon />
                                    </InputAdornment>
                                 }
                              />
                           }
                        >
                           <MenuItem value={1}>1</MenuItem>
                           <MenuItem value={2}>2</MenuItem>
                           <MenuItem value={3}>3</MenuItem>
                           <MenuItem value={4}>4</MenuItem>
                        </Select>
                     </Tooltip>
                  </Stack>
                  <Button
                     disabled={loadingUI}
                     sx={{ marginLeft: "auto" }}
                     variant="contained"
                     type="submit"
                  >
                     {!loadingUI ? "Search" : "Searching.."}
                  </Button>
               </Stack>
            </Paper>
         </LocalizationProvider>
      </div>
   );
};

export default Searchbar;
