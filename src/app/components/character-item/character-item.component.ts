import { Component, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Actor } from '../../models/actor.models';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.css'
})
export class CharacterItemComponent implements OnInit {
  
  @Input() characterId: number | undefined;
  actor: Actor | undefined;

  constructor(private actorSvc: CharacterService) {}
  
  ngOnInit(): void {
    if (this.characterId) {
      this.actorSvc.getOneActor(this.characterId).subscribe((response) => {
        this.characterId = this.getCharacterId(this.characterId!);
      });
    } 
  }
  
  getCharacterId(id: number): number {
    return  id;
  }
}
