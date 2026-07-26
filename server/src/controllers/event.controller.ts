import { Request, Response } from "express";
import { ZodError } from "zod";

import { AuthRequest } from "../types/request.types";
import { createEventSchema } from "../validators/event.validator";
import {
  createEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../services/event.service";
import { getAllEvents } from "../repositories/event.repository";

// ==========================
// Create Event
// ==========================
export const createEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const validatedData = createEventSchema.parse(req.body);

    const event = await createEventService(
      validatedData,
      req.user!._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Events
// ==========================
export const fetchAllEvents = async (
  _req: Request,
  res: Response
) => {
  try {
    const events = await getAllEvents();

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Event By ID
// ==========================
export const fetchEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await getEventByIdService(String(req.params.id));

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error: any) {
    if (error.message === "Event not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Update Event
// ==========================
export const editEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const updatedEvent = await updateEventService(
      String(req.params.id),
      req.user!._id.toString(),
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error: any) {
    if (error.message === "Event not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "You are not authorized to update this event") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Delete Event
// ==========================
export const removeEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await deleteEventService(
      String(req.params.id),
      req.user!._id.toString()
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    if (error.message === "Event not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "You are not authorized to delete this event") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};