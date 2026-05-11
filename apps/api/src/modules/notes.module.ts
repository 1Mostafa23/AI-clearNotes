import { Module } from "@nestjs/common";
import { NotesRepository } from "@libs/db/repositories/notes";
export const NotesRepositoryToken =  Symbol('NotesRepositoryToken')
@Module({
    providers : [{
        provide: NotesRepositoryToken,
        useClass: NotesRepository 
    }],
    exports: [NotesRepositoryToken]
})
export class NotesModule{}
