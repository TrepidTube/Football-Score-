import { Component, OnInit } from '@angular/core';

import { ScoreService } from '../../services/score.service';
import { CounterService } from '../../services/counter.service';
import { ImageStringifyService } from '../../services/image-stringify.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit {

  constructor( public _sc: ScoreService, public _cn: CounterService, public _imgString: ImageStringifyService ) { }

  ngOnInit() {
  }

  updateScore(sc: any){
    if(sc.team == "home"){
      sc.ballHome = "assets/balon.png";
      sc.ballGuest = "assets/balof.png";
    }else{
      sc.ballHome = "assets/balof.png";
      sc.ballGuest = "assets/balon.png";
    }

    if( sc.homeScore > 99 ) {
      sc.homeScore = 99;
    }
    if( sc.guestScore > 100 ) {
      sc.guestScore = 99;
    }
    if( sc.homeTOL > 3 ) {
      sc.homeTOL = 3;
    }
    if( sc.guestTOL > 3 ) {
      sc.guestTOL = 3;
    }
    if( sc.qtr > 4 ) {
      sc.qtr = 4;
    }
    if( sc.down > 4 ) {
      sc.down = 4;
    }
    if( sc.toGo > 99 ) {
      sc.toGo = 99;
    }
    if( sc.ballOn > 50 ) {
      sc.ballOn = 50;
    }
    let data = {
      homeScore: sc.homeScore,
      guestScore: sc.guestScore,
      homeTOL: sc.homeTOL,
      guestTOL: sc.guestTOL,
      down: sc.down,
      toGo: sc.toGo,
      ballOn: sc.ballOn,
      qtr: sc.qtr,
      team: sc.team,
      ballHome: sc.ballHome,
      ballGuest: sc.ballGuest
    }
    this._sc.update(data);
  }

  upImg(event) {
    this._imgString.toBase64(event);
  }
  sendImage(image: string) {
    this._cn.sendImage(image);
    delete this._imgString.dataUrl;
  }
}
