import {Component, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Pro} from "../../models/pro";
import {AuthenticatorService} from "../../service/authenticator.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ngbd-modal',
  templateUrl: './modal-login.component.html'
})
export class NgbdModalComponent implements OnInit{
  closeResult = '';
  formUser = new Pro();
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  userConnect= '';

  constructor(private modalService: NgbModal, private authent: AuthenticatorService, private tokenStorage: TokenStorageService, private route: Router) {}

  ngOnInit(): void {
    this.userConnect = this.tokenStorage.getUser();
    console.log('je passe ici');
    console.log(this.userConnect);
  }

  onSubmit(): void {

    this.authent.login(this.formUser).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);

        this.authent.saveUser(data.token).subscribe(then => {
          this.tokenStorage.saveUser(then);
          this.route.navigate(['/pro-home']);
        });




        /* this.isLoginFailed = false;
         this.isLoggedIn = true;
         this.roles = this.tokenStorage.getUser().roles;
         this.reloadPage();*/
      },
      err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
        // this.alertService.error('Échec de connexion : Identifiants invalides',[] );
      }
    );
  }

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }  else {
      return `with: ${reason}`;
    }
  }
}
