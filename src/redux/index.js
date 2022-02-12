// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import axios from "axios";
// import {
// 	createUserWithEmailAndPassword,
// 	signInWithEmailAndPassword,
// 	signOut,
// 	updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase";

// import {
// 	collection,
// 	getDocs,
// 	getDoc,
// 	doc,
// 	query,
// 	where,
// 	addDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";

// const initialState = {
// 	trips: [
// 		{
// 			id: 9999,
// 			start: "John",
// 			destination: "Doe",
// 			tripDate: "29/03/2021",
// 			price: 25,
// 			createdAt: "27/03/2021",
// 			userId: 101,
// 			places: 4,
// 			driver: {
// 				name: "J.Doe",
// 				rating: 4.7,
// 			},
// 		},
// 	],
// 	trip: {
// 		id: 9999,
// 		start: "John",
// 		destination: "Doe",
// 		tripDate: "29/03/2021",
// 		price: 25,
// 		createdAt: "27/03/2021",
// 		userId: 101,
// 		places: 4,
// 		driver: {
// 			name: "J.Doe",
// 			rating: 4.7,
// 		},
// 	},
// 	user: null,
// 	message: "",
// 	loadingUI: false,
// };
// const reducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case "GET_TRIPS":
// 			return { ...state, trips: action.payload.trips };
// 		case "GET_TRIP":
// 			return { ...state, trip: action.payload.trip };
// 		case "SIGNUP_USER":
// 			return { ...state };
// 		case "LOGIN_USER":
// 			return { ...state };
// 		case "TRIP_ADDED":
// 			return { ...state, message: "Trip has been added successfully" };
// 		case "LOADING_UI":
// 			return { ...state, loadingUI: true };
// 		case "STOP_LOADING_UI":
// 			return { ...state, loadingUI: false };
// 		case "USER_AUTHENTICATED":
// 			return { ...state, user: action.payload };
// 		case "USER_UNAUTHENTICATED":
// 			return { ...state, user: null };
// 		default:
// 			return state;
// 	}
// };

// const getTripsAction = (trips) => ({
// 	type: "GET_TRIPS",
// 	payload: {
// 		trips: trips,
// 	},
// });

// const getTripAction = (trip) => ({
// 	type: "GET_TRIP",
// 	payload: {
// 		trip: trip,
// 	},
// });

// export const getTrips = (searchInput) => async (dispatch) => {
// 	const tripsRef = collection(db, "trips");
// 	const q1 = query(tripsRef, where("start", "==", `${searchInput.start}`));
// 	const q2 = query(
// 		tripsRef,
// 		where("destination", "==", `${searchInput.destination}`)
// 	);
// 	try {
// 		const apiResources = [q1, q2];
// 		const apiPromises = apiResources.map((resource) => {
// 			return getDocs(resource);
// 		});
// 		const queriesSnapshot = await Promise.all(apiPromises);
// 		let trips = [];
// 		queriesSnapshot.map((qs) => {
// 			return qs.forEach((doc) => {
// 				trips.push({ id: doc.id, ...doc.data() });
// 			});
// 		});
// 		const tripsIds = trips.map((trip) => trip.id);
// 		const filteredTrips = trips.filter(
// 			({ id }, index) => !tripsIds.includes(id, index + 1)
// 		);

// 		dispatch(getTripsAction(filteredTrips));
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const getTrip = (id) => async (dispatch) => {
// 	const tripsRef = collection(db, "trips");
// 	const tripRef = doc(tripsRef, `${id}`);
// 	try {
// 		const docSnapshot = await getDoc(tripRef);
// 		const trip = { id: docSnapshot.id, ...docSnapshot.data() };
// 		dispatch(getTripAction(trip));
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const signupUser = (newUserData, history) => async (dispatch) => {
// 	dispatch({ type: "LOADING_UI" });
// 	try {
// 		await createUserWithEmailAndPassword(
// 			auth,
// 			newUserData.email,
// 			newUserData.password
// 		);
// 		await updateProfile(auth.currentUser, {
// 			displayName: newUserData.displayName,
// 		});
// 		dispatch({ type: "SIGNUP_USER" });
// 		dispatch({ type: "STOP_LOADING_UI" });
// 		history.push("/");
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const loginUser = (userData, history) => async (dispatch) => {
// 	dispatch({ type: "LOADING_UI" });
// 	try {
// 		const res = await signInWithEmailAndPassword(
// 			auth,
// 			userData.email,
// 			userData.password
// 		);
// 		console.log("res from signupUser action: ", res);
// 		dispatch({ type: "LOGIN_USER" });
// 		dispatch({ type: "STOP_LOADING_UI" });
// 		history.push("/");
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const logoutUser = () => async (dispatch) => {
// 	dispatch({ type: "LOADING_UI" });

// 	try {
// 		await signOut(auth);
// 		dispatch({ type: "STOP_LOADING_UI" });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const authenticateUser = (user) => (dispatch) => {
// 	dispatch({ type: "USER_AUTHENTICATED", payload: user });
// };

// export const unauthenticateUser = (user) => (dispatch) => {
// 	dispatch({ type: "USER_UNAUTHENTICATED" });
// };

// const setAthorization = (token) => {
// 	const clientToken = `Bearer ${token}`;
// 	localStorage.setItem("token", clientToken);
// 	axios.defaults.headers.common["Authorization"] = clientToken;
// };

// export const addTrip = (newTripData) => async (dispatch) => {
// 	const tripsRef = collection(db, "trips");

// 	try {
// 		const newTripDocRef = await addDoc(tripsRef, newTripData);
// 		dispatch({ type: "TRIP_ADDED", payload: { id: newTripDocRef.id } });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const store = createStore(reducer, initialState, applyMiddleware(thunk));
