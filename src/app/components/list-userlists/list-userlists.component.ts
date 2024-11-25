import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-userlists',
  templateUrl: './list-userlists.component.html',
  styleUrls: ['./list-userlists.component.css']
})
export class ListUserlistsComponent implements OnInit {
  userLists: any[] = [];
  accountId: number = 21623249;
  sessionId: string | null = '511bab00d81359719d0cdc043166fcc2c268aad8';
  listForm: FormGroup;

  constructor(
    private listService: ListService,
    private fb: FormBuilder
  ) {
    this.listForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserLists();
  }

  loadUserLists() {
    if (this.sessionId) {
      this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
        next: (response) => {
          this.userLists = response.results;
        },
        error: (err) => console.error(err),
      });
    }
  }

  createList() {
    if (this.sessionId && this.listForm.valid) {
      const { name, description } = this.listForm.value;
      this.listService.createList(this.sessionId, name, description).subscribe(() => {
        this.loadUserLists();
        this.listForm.reset(); 
      });
    }
  }

  deleteList(listId: number) {
    if (this.sessionId) {
      this.listService.deleteList(listId, this.sessionId).subscribe(() => {
        this.loadUserLists(); 
      });
    }
  }
}
