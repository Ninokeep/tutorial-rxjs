import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, share, switchMap } from 'rxjs';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-tutorial';
  coordinate: Position = {
    x: 0,
    y: 0,
  };

  co$ = new BehaviorSubject<Position>({
    x: 0,
    y: 0,
  });
  result$!: Observable<string | null>;

  getPositionFromApi(x: number, y: number) {
    return of(`Your position is ${x} and ${y}`);
  }
  //thinking it's there you make a call api for get the location of the click
  getPosition(event: MouseEvent): void {
    this.co$.next({ x: event.clientX, y: event.clientY });
  }

  ngOnInit(): void {
    this.result$ = this.co$.pipe(
      switchMap((item) => {
        console.log(item);

        return this.getPositionFromApi(item.x, item.y);
      })
    );
  }
}
