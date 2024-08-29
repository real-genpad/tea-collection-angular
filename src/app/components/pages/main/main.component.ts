import {Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {Modal} from "bootstrap";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) private modalRef!: ElementRef<HTMLElement>
  private observable: Observable<void>;
  private subscription: Subscription | null = null;
  private modal: Modal | null = null;
  constructor() {
    this.observable = new Observable((observer: Subscriber<void>): {unsubscribe: () => void} => {
      const timeout = setTimeout((): void => {
        observer.next();
      }, 10000);

      return {unsubscribe(){clearTimeout(timeout);}}
    })
  }

  ngOnInit(): void {
    this.modal = new Modal(this.modalRef.nativeElement);
    this.subscription = this.observable.subscribe((): void => {
      this.modal?.show();
    });

    $("#accordion").accordion({
      collapsible: true,
      icons: false,
    });
  }

  closeModal(): void {
    this.modal?.hide();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.closeModal();
  }
}
