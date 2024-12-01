import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appHasrole]'
})
export class HasroleDirective {
  private currentUserRoles: string[] = [];

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    // Subscribe to changes in the logged-in user
    this.authService.loggedInUser.subscribe(user => {
      this.currentUserRoles = user ? user.roles : [];
      this.updateView();
    });
  }
  private requiredRole: string = '';

  @Input()
  set appHasRole(role: string) {
    this.requiredRole = role;
    this.updateView();
  }

  private updateView(): void {
    if (this.currentUserRoles.includes(this.requiredRole)) {
      // If the user has the required role, show the element
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Otherwise, clear the view
      this.viewContainer.clear();
    }
  }
}
