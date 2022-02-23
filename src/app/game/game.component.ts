import { Component, OnInit } from '@angular/core';
import { GameService } from './shared/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.start();
  }

  get showStart(): boolean{
    return this.gameService.showStart;
  }

  get showBoard(): boolean{
    return this.gameService.showBoard;
  }

  get showEnd(): boolean{
    return this.gameService.showEnd;
  }

  startGame(): void{
    this.gameService.startGame();
  }
  
  play(posX: number, posY: number):void{
    this.gameService.play(posX, posY);
  }

  viewX(posX: number, posY: number):  boolean{
    return this.gameService.displayX(posX, posY);
  }

  viewO(posX: number, posY: number):  boolean{
    return this.gameService.displayO(posX, posY);
  }

  viewWin(posX: number, posY: number):  boolean{
    return this.gameService.displaywin(posX, posY);
  }

  newGame():void{
    this.gameService.newGame();
  }

  get player(): number{
    return this.gameService.player;
  }

}
