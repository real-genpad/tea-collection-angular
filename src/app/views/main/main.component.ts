import {Component, ElementRef, inject, OnDestroy, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  private observable: Observable<void>;
  private subscription: Subscription | null = null;

  private modalService: NgbModal = inject(NgbModal);
  @ViewChild('modal', { static: true })
  modal!: TemplateRef<ElementRef>

  constructor() {
    this.observable = new Observable((observer: Subscriber<void>): {unsubscribe: () => void} => {
      const timeout = setTimeout((): void => {
        observer.next();
      }, 10000);

      return {unsubscribe(){clearTimeout(timeout);}}
    })
  }

  ngOnInit(): void {
    this.subscription = this.observable.subscribe((): void => {
      this.modalService.open(this.modal, {})
    });

    $("#accordion").accordion({
      collapsible: true,
      icons: false,
    });
  }

  closeModal(): void {
    this.modalService.dismissAll(this.modal)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.closeModal();
  }
}
