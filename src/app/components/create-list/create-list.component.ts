import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../../services/list.service'; 
import { Router } from '@angular/router';  
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {
  listForm: FormGroup;
  sessionId: string | null = localStorage.getItem('session_id'); 

  constructor(
    private fb: FormBuilder,
    private listService: ListService,  
    private router: Router  
  ) {
    this.listForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.listForm.valid && this.sessionId) {
      const { name, description } = this.listForm.value;
      
      this.listService.createList(this.sessionId, name, description).subscribe({
        next: () => {
          this.router.navigate(['/userList']);  
        },
        error: (err) => {
          console.error('Error al crear la lista:', err);
        }
      });
      
      this.listForm.reset(); 
    }
  }
}
