import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  trips: [
    {
      id: 9999,
      start: "John",
      destination: "Doe",
      tripDate: "29/03/2021",
      price: 25,
      createdAt: "27/03/2021",
      userId: 101,
      places: 4,
      driver: {
        name: "J.Doe",
        rating: 4.7,
      },
    },
  ],
  trip: {
    id: 9999,
    start: "John",
    destination: "Doe",
    tripDate: "28/02/2022",
    price: 25,
    createdAt: "27/03/2021",
    userId: 101,
    places: 4,
    driver: {
      name: "J.Doe",
      rating: 4.7,
    },
  },
  user: null,
  message: "",
  loadingUI: false,
  error: null,
};

const tripsRef = collection(db, "trips");

export const getTrips = createAsyncThunk(
  "trips/getTrips",
  async (searchInput) => {
    const q1 = query(tripsRef, where("start", "==", `${searchInput.start}`));
    const q2 = query(
      tripsRef,
      where("destination", "==", `${searchInput.destination}`)
    );

    const apiResources = [q1, q2];
    const apiPromises = apiResources.map((resource) => {
      return getDocs(resource);
    });
    const queriesSnapshot = await Promise.all(apiPromises);
    let trips = [];
    queriesSnapshot.map((qs) => {
      return qs.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
    });
    const tripsIds = trips.map((trip) => trip.id);
    const filteredTrips = trips.filter(
      ({ id }, index) => !tripsIds.includes(id, index + 1)
    );

    return filteredTrips;
  }
);

export const getTrip = createAsyncThunk("trips/getTrip", async (id) => {
  const tripRef = doc(tripsRef, `${id}`);
  const docSnapshot = await getDoc(tripRef);
  const trip = { id: docSnapshot.id, ...docSnapshot.data() };

  return trip;
});

export const addTrip = createAsyncThunk(
  "trips/addTrip",
  async (newTripData) => {
    const newTripDoc = await addDoc(tripsRef, newTripData);
    return newTripDoc;
  }
);

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    getTrip(state, action) {},
  },
  extraReducers(builder) {
    builder
      .addCase(getTrips.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.loadingUI = false;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTrip.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.loadingUI = false;
        state.trip = action.payload;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addTrip.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        state.loadingUI = false;
        state.message = `trip of id: ${action.payload.id} has been added`;
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tripsSlice.reducer;
