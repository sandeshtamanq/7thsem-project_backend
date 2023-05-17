import { decode } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Request, NextFunction } from 'express';

export async function APILogger(req: Request, _: any, next: NextFunction) {
  // No need to worry about OPTIONS method
  if (req.method === 'OPTIONS') return next();

  // Logging every API call to terminal
  const logger = new Logger('API CALL');
  logger.log(`${req.method} - ${req.path} :: ${JSON.stringify(req.query)}`);

  // Exit if no token provided
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token) return next();

  const details = decode(token);
  if (!details) return next();

  next();
}
