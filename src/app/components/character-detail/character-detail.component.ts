import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actor.models';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
  standalone:false
})
export class CharacterDetailComponent implements OnInit {
  //Atributos de la clase
  actorId: number | null = null;
  actor: Actor | undefined;
  //COnstructor de la clase
  constructor(private route:ActivatedRoute,
    private actorSvc: CharacterService)  {}

  //Metodo de la clase
  ngOnInit(): void {
    this.actorId = Number(this.route.snapshot.paramMap.get('id'));
    this.actorSvc.getOneActor(this.actorId!).subscribe((response) => {
      if (response) {
        this.actorId ;
      } else {
        console.warn('No se encontró el actor.');
     }
    });
  }
  

    
}

