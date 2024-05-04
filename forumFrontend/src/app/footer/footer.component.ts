import { Component } from '@angular/core';
import {AnalyticsService} from "../analytics.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.analyticsService.trackEvent('page_view', 'Footer viewed', 'FOOTER_PAGE');
  }

}
