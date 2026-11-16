import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AirlineProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  moderatorId: Types.ObjectId | undefined;

  @Prop({ required: true })
  name: string | undefined;

  @Prop()
  logoUrl: string | undefined;

  @Prop()
  contactEmail: string | undefined;
}

@Schema({ timestamps: true })
export class Flight extends Document {
  @Prop({ required: true })
  flightNumber: string | undefined;

  @Prop({ type: Types.ObjectId, ref: 'AirlineProfile', required: true })
  airlineId: Types.ObjectId | undefined;

  @Prop({ required: true })
  departureAirport: string | undefined; // IATA code

  @Prop({ required: true })
  arrivalAirport: string | undefined; // IATA code

  @Prop({ required: true })
  departureTimeUtc: Date | undefined;

  @Prop({ required: true })
  arrivalTimeUtc: Date | undefined;

  @Prop({ required: true })
  departureDate: string | undefined; // YYYY-MM-DD

  @Prop({
    type: {
      economy: { seatCount: { type: Number, min: 1 }, price: Number },
      premiumEconomy: { seatCount: { type: Number, min: 1 }, price: Number },
      business: { seatCount: { type: Number, min: 1 }, price: Number },
      first: { seatCount: { type: Number, min: 1 }, price: Number },
    },
    required: true,
  })
  cabins: Record<string, { seatCount: number; price: number; }> | undefined;

  @Prop({ required: true, default: 0 })
  extraBaggagePricePerKg: number | undefined;

  @Prop({
    type: [{ hoursBeforeDeparture: Number, refundPercentage: Number }],
    default: [],
  })
  cancellationTiers: { hoursBeforeDeparture: number; refundPercentage: number; }[] | undefined;

  @Prop({
    type: String,
    enum: ['SCHEDULED', 'DEPARTED', 'ARRIVED', 'CANCELLED', 'DELAYED'],
    default: 'SCHEDULED',
  })
  status: string | undefined;

  @Prop({ type: Boolean, default: false })
  hasConfirmedBookings: boolean | undefined;
}

export const AirlineProfileSchema = SchemaFactory.createForClass(AirlineProfile);
export const FlightSchema = SchemaFactory.createForClass(Flight);