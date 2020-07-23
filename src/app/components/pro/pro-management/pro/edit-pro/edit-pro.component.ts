import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ViewRef } from '@angular/core';
import {ProService } from 'src/app/service/pro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AlertService } from 'src/app/service/alerte.service';
import { Pro } from 'src/app/models/pro';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-edit-pro',
  templateUrl: './edit-pro.component.html',
  styleUrls: ['./edit-pro.component.css']
})
export class EditProComponent implements OnInit {

  addUserFailed = false;
  errorMessage = '';
  errorFieldType = '';
  userForm: Pro;
  isLoading: boolean;
  isInProgress: boolean;
  isAdmin: boolean;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  onlyCountries: CountryISO[] = [
    CountryISO.France,
    CountryISO.Morocco
  ];

  constructor(
    private proService: ProService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef

  ) {
    ref.detach();
    setInterval(() => {
      if (this.ref !== null && this.ref !== undefined &&
        !(this.ref as ViewRef).destroyed) {
        this.ref.detectChanges();
      }
    }, 250);
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    let token = this.tokenStorage.getToken();

    this.isLoading = true;
    this.proService.getUserById(token,id).subscribe((data: Pro) => {
      this.userForm = data;
      if (data.nom == 'admin'){
        this.isAdmin = true;
      }
      this.isLoading = false;
    });
  }

  editUser(validationForm: any) {
    this.isInProgress = true;

    let setNumTelType = validationForm.form.get('numTelephone').value;
    validationForm.controls['numTelephone'].setValue(setNumTelType.e164Number);
    let token = this.tokenStorage.getToken();
    this.proService.editUser(token,this.userForm).subscribe(data => {
        this.isInProgress = false;
        this.router.navigate(['pro-management']);
        this.alertService.success('L\'utilisateur '+ this.userForm.nom + ' a été mis à jour.', true);
      },
      err => {
        this.addUserFailed = true;
        this.errorFieldType = err.error.violations[0].propertyPath;
        this.errorMessage = err.error.violations[0].message;
        this.formError(validationForm , this.errorFieldType, this.errorMessage  );
      }
    );
  }

  formError(validationForm:any, errorFieldType: string, errorMessage: string){
    this.isInProgress = false;
    if (errorFieldType == 'email'){
      validationForm.form.controls['email'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
    }
    else if (errorFieldType == 'nom'){
      validationForm.form.controls['nom'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
    }
    else if (errorFieldType == 'numTelephone'){
      validationForm.form.controls['phone'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
    }
  }

}
