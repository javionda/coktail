import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class NoteListService {

    private noteListRef = this.db.list('tasks');

    constructor(private db: AngularFireDatabase) { }

    getNoteList() {
        return this.noteListRef;
    }


}