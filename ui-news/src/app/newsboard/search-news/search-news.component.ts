import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search-news',
    templateUrl: './search-news.component.html'
})
export class SearchNewsComponent implements OnInit {

    @Input() disabled: boolean = false;
    @Output() updateFilterString = new EventEmitter<string>();
    searchForm: FormGroup = new FormGroup({
        searchText: new FormControl()
    });

    constructor() { }

    ngOnInit(): void {
        this.searchForm.valueChanges.pipe(
            // if user stop typing for one second
            debounceTime(1000)
        ).subscribe(data => {
            this.updateFilterString.emit(data);
        })
    }

}
