import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  InputAdornment,
  Button,
  Stack,
  Select,
  Divider,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  LocationOn as LocationIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { StyledInput } from "../components/StyledInput";
import { addTrip } from "../features/trips/tripsSlice";
import { useSelector, useDispatch } from "react-redux";
import { sub, add, getHours, getMinutes, getSeconds, format } from "date-fns";

const AddTrip = () => {
  const initialValues = {
    start: "",
    destination: "",
    price: "",
    places: "",
  };
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState(1);
  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date(0, 0, 0, 8));

  const message = useSelector((state) => state.trips.message);
  const loadingUI = useSelector((state) => state.trips.loadingUI);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const { start, destination, price, places } = values;

    let zeroSecAndMinDateValue = sub(dateValue, {
      hours: getHours(dateValue),
      minutes: getMinutes(dateValue),
      seconds: getSeconds(dateValue),
    });
    let finalDateValue = add(zeroSecAndMinDateValue, {
      hours: getHours(timeValue),
      minutes: getMinutes(timeValue),
    });

    const newTripData = {
      start,
      destination,
      price: Number(price),
      places: Number(places),
      startDate: finalDateValue,
    };
    dispatch(addTrip(newTripData));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            Where are you leaving from?
          </Typography>
          <StyledInput
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
            value={values.start}
            name="start"
            placeholder="Start.."
            label="Start"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LocationIcon />
              </InputAdornment>
            }
          />
          <Button
            sx={{ alignSelf: "flex-end" }}
            variant="contained"
            onClick={nextStep}
          >
            Next
          </Button>
        </Box>
      );

    case 2:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            Where are you heading?
          </Typography>
          <StyledInput
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
            value={values.destination}
            name="destination"
            placeholder="Destination.."
            label="Destination"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LocationIcon />
              </InputAdornment>
            }
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch"
          >
            <Button
              variant="contained"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Box>
      );

    case 3:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            When would you go?
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              placeholder="When?.."
              value={dateValue}
              onChange={(newDateValue) => setDateValue(newDateValue)}
              minDate={new Date()}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <StyledInput
                  sx={{
                    backgroundColor: "#f7f7f7",
                    fontSize: "18px",
                    fontWeight: "500",
                    width: "170px",
                  }}
                  inputRef={inputRef}
                  endAdornment={InputProps?.endAdornment}
                  {...inputProps}
                />
              )}
            />
          </LocalizationProvider>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch"
            mt={2}
          >
            <Button
              variant="contained"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Box>
      );

    case 4:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            At what Time would you go?
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              placeholder="When?.."
              ampm={false}
              value={timeValue}
              onChange={(newTimeValue) => setTimeValue(newTimeValue)}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <StyledInput
                  sx={{
                    backgroundColor: "#f7f7f7",
                    fontSize: "18px",
                    fontWeight: "500",
                    width: "170px",
                  }}
                  inputRef={inputRef}
                  endAdornment={InputProps?.endAdornment}
                  {...inputProps}
                />
              )}
            />
          </LocalizationProvider>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch"
            mt={2}
          >
            <Button
              variant="contained"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Box>
      );

    case 5:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            How many passengers can you take?
          </Typography>
          <Select
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
            value={values.places}
            name="places"
            placeholder="Places.."
            label="Places"
            fullWidth
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
            <MenuItem value={5}>5</MenuItem>
          </Select>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch"
          >
            <Button
              variant="contained"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Box>
      );

    case 6:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" mt={4} mb={2}>
            How much would you charge per seat?
          </Typography>
          <StyledInput
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
            value={values.price}
            type="number"
            name="price"
            placeholder="Price.."
            fullWidth
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          ></StyledInput>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignSelf="stretch"
          >
            <Button
              variant="contained"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Box>
      );

    case 7:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Stack>
            <Typography variant="h4" p={2}>
              Review your trip before submitting
            </Typography>
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Start
              </Typography>
              <Typography variant="h6">{values.start}</Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Destination
              </Typography>
              <Typography variant="h6">{values.destination}</Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Date
              </Typography>
              <Typography variant="h6">
                {format(dateValue, "d MMM yyyy")}
              </Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Time
              </Typography>
              <Typography variant="h6">{format(timeValue, "HH:mm")}</Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Price
              </Typography>
              <Typography variant="h6">{values.price} €</Typography>
            </Stack>
            <Divider variant="middle" />
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography variant="h6" color="text.secondary">
                Number of passengers
              </Typography>
              <Typography variant="h6">{values.places}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mt={4}>
              <Button
                variant="contained"
                onClick={prevStep}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disabled={loadingUI}
                onClick={handleSubmit}
                startIcon={<CheckIcon />}
              >
                {!loadingUI ? "Submit" : "Submitting.."}
              </Button>
            </Stack>
          </Stack>

          <Typography>the message: {message}</Typography>
        </Box>
      );
  }

  // return (
  //  <Paper sx={{ gridColumn: "center-start / center-end", padding: 2 }}>
  //    <form onSubmit={handleSubmit}>
  //      <TextField
  //        onChange={handleChange}
  //        value={values.start}
  //        name="start"
  //        placeholder="Start.."
  //        label="Start"
  //      ></TextField>
  //      <TextField
  //        onChange={handleChange}
  //        value={values.destination}
  //        name="destination"
  //        placeholder="Destination.."
  //        label="Destination"
  //      ></TextField>
  //      <TextField
  //        onChange={handleChange}
  //        value={values.places}
  //        select
  //        name="places"
  //        placeholder="Places.."
  //        label="Places"
  //        fullWidth
  //      >
  //        <MenuItem value={1}>1</MenuItem>
  //        <MenuItem value={2}>2</MenuItem>
  //        <MenuItem value={3}>3</MenuItem>
  //        <MenuItem value={4}>4</MenuItem>
  //        <MenuItem value={5}>5</MenuItem>
  //      </TextField>
  //      <TextField
  //        onChange={handleChange}
  //        value={values.price}
  //        type="number"
  //        name="price"
  //        placeholder="Price.."
  //        InputProps={{
  //          startAdornment: <InputAdornment position="start">€</InputAdornment>,
  //        }}
  //      ></TextField>
  //      <Button disabled={loadingUI} type="submit">
  //        {!loadingUI ? "Add Trip" : "Adding trip.."}
  //      </Button>
  //    </form>
  //    <br />
  //    <Typography>the message: {message}</Typography>
  //  </Paper>
  // );
};

export default AddTrip;
