import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numberMoviments: number = 0;
  private win: any;

  private _player: number = 0;
  private _showStart: boolean = false;
  private _showBoard: boolean = false;
  private _showEnd: boolean = false;

  constructor() { }

  start(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showEnd = false;
    this.numberMoviments = 0;
    this._player = this.X;
    this.win = false;
    this.startHash();
  }

  startHash(): void {
    this.board = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showStart(): boolean{
    return this._showStart;
  }

  get showBoard(): boolean{
    return this._showBoard;
  }

  get showEnd(): boolean {
    return this._showEnd;
  }

  get player(): number {
    return this._player;
  }

  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    if (this.board[posX][posY] !== this.EMPTY || 
      this.win) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numberMoviments++;
    this.win = this.endGame(posX, posY, 
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.win && this.numberMoviments < 9) {
      this.playCPU();
    }

    if (this.win !== false) {
      this._showEnd = true;
    }

    if (!this.win && this.numberMoviments === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  endGame(linha: number, coluna: number, 
      board: any, player: number) {
    let fim: any = false;

    if (board[linha][0] === player && 
      board[linha][1] === player && 
      board[linha][2] === player) {
      fim = [[linha, 0], [linha, 1], [linha, 2]];
    }

    if (board[0][coluna] === player && 
      board[1][coluna] === player && 
      board[2][coluna] === player) {
      fim = [[0, coluna], [1, coluna], [2, coluna]];
    }

    if (board[0][0] === player && 
      board[1][1] === player && 
      board[2][2] === player) {
      fim = [[0, 0], [1, 1], [2, 2]];
    }

    if (board[0][2] === player && 
      board[1][1] === player && 
      board[2][0] === player) {
      fim = [[0, 2], [1, 1], [2, 0]];
    }

    return fim;
  }

  playCPU(): void {
    let play: number[] = this.getMove(this.O);

    if (play.length <= 0) {
      play = this.getMove(this.X);
    }

    if (play.length <= 0) {
      let plays: any = [];
      for (let i=0; i<this.TAM_TAB; i++) {
        for (let j=0; j<this.TAM_TAB; j++) {
          if (this.board[i][j] === this.EMPTY) {
            plays.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (plays.length - 1)));
      play = [plays[k][0], plays[k][1]];
    }

    this.board[play[0]][play[1]] = this._player;
    this.numberMoviments++;
    this.win = this.endGame(play[0], play[1],
        this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }


  getMove(player: number): number[] {
    let tab = this.board;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }


  displayX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  displayO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  displaywin(posX: number, posY: number): boolean {
    let displaywin: boolean = false;

    if (!this.win) {
      return displaywin;
    }

    for (let pos of this.win) {
      if (pos[0] === posX && pos[1] === posY) {
        displaywin = true;
        break;
      }
    }

    return displaywin;
  }

  newGame(): void {
    this.start();
    this._showEnd = false;
    this._showStart = false;
    this._showBoard = true;
  }

}
