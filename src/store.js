import { configureStore } from "@reduxjs/toolkit";
import tripsReducer from "./features/trips/tripsSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
	reducer: {
		trips: tripsReducer,
		users: usersReducer,
	},
});
