import {Component, OnDestroy, OnInit,} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  popup: boolean = false;
  private observable: Observable<void>;
  private subscription: Subscription | null = null;
  constructor() {
    this.observable = new Observable((observer: Subscriber<void>): {unsubscribe: () => void} => {
      const timeout = setTimeout((): void => {
        observer.next();
      }, 10000);

      return {unsubscribe(){clearTimeout(timeout);}}
    })
  }

  ngOnInit() {
    this.subscription = this.observable.subscribe((): void => {
      this.showPopup();
    });

    $("#accordion").accordion({
      collapsible: true,
      icons: false,
    });
  }

  showPopup(): boolean {
    return this.popup = true;
  }

  popupHide(): boolean {
    return this.popup = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
