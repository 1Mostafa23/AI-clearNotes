import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { NotesModule } from './modules/notes.module';
import { UsersModule } from './modules/users.module';
import { JournalModule } from './modules/journal.module';



@Module({
  imports: [DbModule, NotesModule, UsersModule, JournalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
