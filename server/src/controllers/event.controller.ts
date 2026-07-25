import { Response, Request } from "express";
import { ZodError } from "zod";

import { AuthRequest } from "../types/request.types";
import { createEventSchema } from "../validators/event.validator";
import { createEventService } from "../services/event.service";
import { getAllEvents } from "../repositories/event.repository";


// Create Event

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

 
// Get All Events

export const fetchAllEvents = async (
  req: Request,
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