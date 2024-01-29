import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ScoreService {
  url: string;
  homeScore: number;
  guestScore: number;
  homeTOL: number;
  guestTOL: number;
  down: number;
  toGo: number;
  ballOn: number;
  qtr: number;
  team: string;
  ballHome: string;
  ballGuest: string;

  constructor( public http: Http ) {
    this.url = '';
    this.homeScore = 0;
    this.guestScore = 0;
    this.homeTOL = 3;
    this.guestTOL = 3;
    this.down = 1;
    this.toGo = 10;
    this.ballOn = 30;
    this.qtr = 1;
    this.team = 'home';
    this.ballHome = 'assets/balon.png';
    this.ballGuest = 'assets/balof.png';
  }

  getData() {
    if(this.url) {
      let dataRef = this.http.get('http://' + this.url).pipe( map( res => res.json() ) );
      dataRef.subscribe( data => {
        data = JSON.parse(data);
        this.homeScore = data.homeScore;
        this.guestScore = data.guestScore;
        this.homeTOL = data.homeTOL;
        this.guestTOL = data.guestTOL;
        this.down = data.down;
        this.toGo = data.toGo;
        this.ballOn = data.ballOn;
        this.qtr = data.qtr;
        this.ballHome = data.ballHome;
        this.ballGuest = data.ballGuest;
      })
    }
  }

  update(sc: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = JSON.stringify(sc);
    console.log(body)
    let postRef = this.http.post( 'http://' + this.url, body, { headers } ).pipe( map( res => res.json() ) );
    postRef.subscribe(success => {console.log('posted')});
  }
}
