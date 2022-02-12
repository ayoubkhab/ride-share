import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrip } from "../features/trips/tripsSlice";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import {
  Typography,
  Card,
  Avatar,
  Button,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import { StarRate, MailOutlined, ArrowRightAlt } from "@mui/icons-material";

const TripInfo = () => {
  let { id } = useParams();
  const trip = useSelector((state) => state.trips.trip);
  const dispatch = useDispatch();

  const {
    price,
    start,
    destination,
    tripDate,
    driver: { name, rating, ratingCount },
  } = trip;

  useEffect(() => {
    dispatch(getTrip(id));
  }, [id, dispatch]);

  return (
    <Grid item xs={12}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">
          {format(tripDate.seconds * 1000, "EEE d MMM y")}
        </Typography>
        <Box sx={{ marginY: 2 }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" sx={{ marginRight: 1 }}>
              18:00
            </Typography>
            <Typography variant="h6">{start}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" sx={{ marginRight: 1 }}>
              20:00
            </Typography>
            <Typography variant="h6">{destination}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: 2,
          }}
        >
          <Typography variant="h6">Total price for 1 passenger</Typography>
          <Typography variant="h6">{`${price}$`}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: 2,
          }}
        >
          <div>
            <Typography variant="h6">{name}</Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: -0.5 }}
            >
              <StarRate />
              <Typography
                sx={{ marginLeft: 0.75 }}
                variant="h6"
              >{`${rating} / 5 - ${ratingCount} rates`}</Typography>
            </Box>
          </div>
          <Avatar>{name[0]}</Avatar>
        </Box>
        <div>
          <Typography variant="body1">
            I can wait for 30 mintues after the indicated time, the ride would
            be fun. I can wait for 30 mintues after the indicated time, the ride
            would be fun. I can wait for 30 mintues after the indicated time,
            the ride would be fun. I can wait for 30 mintues after the indicated
            time, the ride would be fun.
          </Typography>
        </div>
        <Button sx={{ textTransform: "none" }}>
          <MailOutlined sx={{ marginRight: 1 }} />
          <Typography variant="h6">{`Reach ${name}`}</Typography>
        </Button>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            endIcon={<ArrowRightAlt />}
            sx={{ textTransform: "none" }}
          >
            Continue
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default TripInfo;
