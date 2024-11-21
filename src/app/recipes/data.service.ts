import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class DataService {
    private filterValueSubject = new BehaviorSubject<string>('');
    filterValue$ = this.filterValueSubject.asObservable(); //observable to be subscribed to

    //method to update the value in service
    setFilterValue(value: string){
        this.filterValueSubject.next(value);  //emit new value to subscribers
        console.log("Data Service: "+ value); //deri ketu jemi ne rregull
    }

    //optionally, method to get the current value directly
    getFilterValue(): string{
        console.log("get method data service: " + this.filterValueSubject.value);
        return this.filterValueSubject.value; //get current value without emitting new value to subscribers
    }
}