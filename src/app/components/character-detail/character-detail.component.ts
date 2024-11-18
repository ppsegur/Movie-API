import { Component, Input, OnInit } from '@angular/core';
import { Actor, KnownFor } from '../../models/actor.models';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
  standalone:false
})
export class CharacterDetailComponent implements OnInit {
  //Atributos de la clase
   @Input() actorId: number | undefined;
   @Input() KnownForMovies: any[] = [];
  actor: Actor | undefined;
  
  //Constructor de la clase
  constructor(private route:ActivatedRoute,
    private actorSvc: CharacterService,
    private location: Location, 
    private router: Router )  {}

  //Método de la clase
  ngOnInit(): void {
    this.actorId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.actorId) {
      // Get actor details
      this.actorSvc.getOneActor(this.actorId).subscribe((response) => {
        this.actor = response;
      });

      // Get actor movies/shows separately
      this.actorSvc.getActorMovies(this.actorId).subscribe((response) => {
        this.KnownForMovies = response.cast || [];
      });
    }
    }

    //Botón de regreso
    goBack(): void {
      this.location.back();
    }
  
  }


