import { db } from "./client";
import { Global, Module } from '@nestjs/common';

export const DRIZZLE_TOKEN = "DRIZZLE_TOKEN";

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE_TOKEN,
            useValue: db
        },
    ],
exports: [DRIZZLE_TOKEN],
})
export class DbModule{}