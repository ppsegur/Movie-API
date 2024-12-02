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
  accountId: number | null = null;
  sessionId: string | null = null;
  listForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

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
    this.sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    this.accountId = accountId ? +accountId : null;

    if (!this.sessionId || !this.accountId) {
      this.errorMessage = 'No se pudo obtener la sesión o el ID de la cuenta. Por favor, inicia sesión nuevamente.';
      return;
    }

    this.loadUserLists();
  }

  loadUserLists() {
    if (this.sessionId && this.accountId) {
      this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
        next: (response) => {
          this.userLists = response.results;
          this.successMessage = 'Listas de usuario cargadas correctamente.';
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar las listas de usuario.';
          console.error(err);
        },
      });
    }
  }

  createList() {
    if (this.sessionId && this.listForm.valid) {
      const { name, description } = this.listForm.value;
      this.listService.createList(this.sessionId, name, description).subscribe({
        next: () => {
          this.successMessage = 'Lista creada con éxito.';
          this.loadUserLists();
          this.listForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Error al crear la lista. Inténtalo nuevamente.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa los campos requeridos.';
    }
  }

  deleteList(listId: number) {
    if (this.sessionId) {
      this.listService.deleteList(listId, this.sessionId).subscribe({
        next: () => {
          this.successMessage = 'Lista eliminada correctamente.';
          this.loadUserLists();
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar la lista.';
          console.error(err);
        }
      });
    }
  }
}