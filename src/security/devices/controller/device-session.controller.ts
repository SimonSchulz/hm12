import { Request, Response, NextFunction } from "express";
import { SessionDevicesService } from "../domain/session.devices.service";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToDeviceViewModel } from "../routes/mappers/map-to-devices-view-model";
import {
  ForbiddenError,
  NotFoundError,
} from "../../../core/utils/app-response-errors";
import { inject, injectable } from "inversify";
import TYPES from "../../../core/container/types";

@injectable()
export class DeviceSessionController {
  constructor(
    @inject(TYPES.SessionDevicesService) private service: SessionDevicesService,
  ) {}

  async getAllSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.deviceInfo;
      const sessions = await this.service.getAllSessions(payload!.userId);
      const result = sessions.map(mapToDeviceViewModel);
      res.status(HttpStatus.Ok).send(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteOtherSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.deviceInfo!;
      await this.service.deleteOtherSessions(payload.userId, payload.deviceId);
      res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      next(e);
    }
  }

  async deleteDevicesById(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPayload = req.deviceInfo!;
      const deviceIdToDelete = req.params.deviceId;
      const sessionToDelete =
        await this.service.getSessionByDeviceId(deviceIdToDelete);

      if (!sessionToDelete) {
        throw new NotFoundError("Session not found");
      }

      if (sessionToDelete.userId !== currentPayload.userId) {
        throw new ForbiddenError("Cannot delete session of another user");
      }

      await this.service.deleteSessionByDeviceId(deviceIdToDelete);
      res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
      next(e);
    }
  }
}
