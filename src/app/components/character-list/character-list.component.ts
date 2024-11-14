import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Actor } from '../../models/actor.models';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  actors: Actor[] = [];

  constructor(private actorService: CharacterService) {}

  ngOnInit(): void {
    this.actorService.getActors().subscribe(
      (data) => { this.actors = data.results;}
    );
  }
}
