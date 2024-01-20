// booking.js

import express from "express";
import {
    createBooking,
    getAllBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
} from "../Controllers/bookingController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Use authenticate and restrict middleware for routes that require authentication
router.use(authenticate);

// Create a new booking (requires authentication)
router.post("/", createBooking);

// Get all bookings (requires authentication)
router.get("/", getAllBookings);

// Get a specific booking by ID (requires authentication)
router.get("/:id", getSingleBooking);

// Update a booking by ID (requires authentication)
router.patch("/:id", restrict(['doctor']), updateBooking);

// Delete a booking by ID (requires authentication)
router.delete("/:id", restrict(['doctor']), deleteBooking);

export default router;