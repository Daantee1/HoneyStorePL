import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() sortAsc = new EventEmitter<void>();
  @Output() sortDesc = new EventEmitter<void>();
  

  ascendingCheckBox = new FormControl(false);
  descendingCheckBox = new FormControl(false);

  ascendingCheckBoxChange() {
    if(this.ascendingCheckBox.value){
      this.descendingCheckBox.setValue(false)
      this.sortAsc.emit()
    }
  }

  descendingCheckBoxChange() {
    if(this.descendingCheckBox.value){
      this.ascendingCheckBox.setValue(false)
      this.sortDesc.emit();
    }
  }


  
}
