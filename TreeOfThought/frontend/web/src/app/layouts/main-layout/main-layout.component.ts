import { TotButtonComponent } from '@tot/shared';
import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthService, APP_CLAIMS, TotClaimDirective } from '@tot/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService, MenuItem } from '../../services/menu.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    TotButtonComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    TranslocoModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    TotClaimDirective
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  isCollapsed = false;
  currentLang = 'vi';
  sidebarWidth = 256;
  sidebarBorderRight = '1px solid #303030'; // Configurable border
  breadcrumbs: Array<{ label: string; url: string }> = [];

  private authService = inject(AuthService);
  private translate = inject(TranslocoService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private menuService = inject(MenuService);

  menuItems: MenuItem[] = [];

  user$ = this.authService.currentUser$;
  claims = APP_CLAIMS;

  // Resize properties
  isResizing = false;
  private startX = 0;
  private startWidth = 0;

  constructor() {
    this.currentLang = this.translate.getActiveLang() || localStorage.getItem('lang') || 'vi';
    this.translate.langChanges$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.updateOpenMap();
      });
    
    // Initial call
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.menuItems = this.menuService.getMenu();
    this.updateOpenMap();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const snapshot = child.snapshot;
      if (!snapshot) continue;

      const routeURL: string = snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private updateOpenMap() {
    const url = this.router.url;
    this.menuItems.forEach(item => {
      if (item.children) {
        item.open = item.children.some(child => child.route && url.includes(child.route));
      }
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    console.log('Sidebar collapsed:', this.isCollapsed);
  }

  switchLanguage(lang: string) {
    this.translate.setActiveLang(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  hasClaim(claim: string): boolean {
    return this.authService.hasClaim(claim);
  }

  logout() {
    this.authService.logout();
  }

  onMouseDown(event: MouseEvent) {
    if (this.isCollapsed) return;
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarWidth;
    document.body.style.cursor = 'col-resize';
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const deltaX = event.clientX - this.startX;
    const newWidth = this.startWidth + deltaX;
    
    // Constraints: Min 160, Max 600 (example)
    if (newWidth >= 160 && newWidth <= 600) {
      this.sidebarWidth = newWidth;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = 'default';
    }
  }
}
