import { ChangeDetectorRef, Component, Input, OnInit, ViewChild,  } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  constructor() {
    this.filterComponent= new FilterComponent()
  }

  ngOnInit(){

  }
}
