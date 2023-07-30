import { Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { Observable, combineLatest, from, map, of, startWith } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

export interface Dogs {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent implements OnInit {
  constructor(private dogService: DogService, private fb: FormBuilder) {}
  forms = this.fb.group({
    filter: new FormControl(''),
  });

  dogs$: Observable<Dogs[]> = of<Dogs[]>([
    {
      id: 1,
      name: 'toto',
    },
    {
      id: 2,
      name: 'tino',
    },
    {
      id: 3,
      name: 'jean',
    },
    {
      id: 4,
      name: 'jean philippe',
    },
    {
      id: 5,
      name: 'sony',
    },
  ]);

  dogFiltered$?: Observable<Dogs[]>;

  filter$: Observable<string | null> = this.forms
    .get('filter')!
    .valueChanges.pipe(startWith(''));

  ngOnInit(): void {
    this.dogFiltered$ = combineLatest([this.dogs$, this.filter$]).pipe(
      map(([dogs, filter]: [Dogs[], string | null]) => {
        return dogs.filter((dog: any) => {
          const lowerCaseFilter = filter?.toLowerCase() ?? '';
          return dog.name.toLowerCase().startsWith(lowerCaseFilter);
        });
      })
    );
  }
}
