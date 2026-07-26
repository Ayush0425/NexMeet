import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

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
export const createEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
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
  }
);


// ==========================
// Get All Events
// ==========================
export const fetchAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const category = req.query.category as string;
    const sort = req.query.sort as string;

    // Pagination Validation
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const { events, totalEvents } = await getAllEvents(
      search,
      category,
      page,
      limit,
      sort
    );

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      totalEvents,
      count: events.length,
      data: events,
    });
  }
);

// ==========================
// Get Event By ID
// ==========================
export const fetchEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const event = await getEventByIdService(String(req.params.id));

    return res.status(200).json({
      success: true,
      data: event,
    });
  }
);

// ==========================
// Update Event
// ==========================
export const editEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
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
  }
);

// ==========================
// Delete Event
// ==========================
export const removeEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteEventService(
      String(req.params.id),
      req.user!._id.toString()
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  }
);