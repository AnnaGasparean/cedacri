// homepage.component.ts
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.css']
})
export class HomepageComponent implements OnInit {

  title = 'angular-project';

  ngOnInit(): void {
  }

}
