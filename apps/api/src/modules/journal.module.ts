import { DbModule } from '@libs/db';
import { JournalRepository } from '@libs/db/repositories/journal';
import { Global, Module } from '@nestjs/common';

export const JournalRepositoryToken = Symbol('JournalRepositoryToken')
@Module({
    imports: [DbModule],
    providers: [{
        provide: JournalRepositoryToken,
        useClass: JournalRepository
    }],
    exports: [JournalRepository],
})

export class JournalModule{}