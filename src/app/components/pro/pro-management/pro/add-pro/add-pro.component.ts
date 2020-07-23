import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pro } from 'src/app/models/pro';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ProService } from 'src/app/service/pro.service';
import { AlertService } from 'src/app/service/alerte.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-pro',
  templateUrl: './add-pro.component.html',
  styleUrls: ['./add-pro.component.css']
})
export class AddProComponent implements OnInit {
  addUserFailed = false;
  errorMessage = '';
  errorFieldType = '';
  userForm: Pro;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  onlyCountries: CountryISO[] = [
    CountryISO.France,
    CountryISO.Morocco,
  ];
  isInProgress: boolean;

  constructor(private proService: ProService, private router: Router, private tokenStorage: TokenStorageService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.userForm = new Pro();
  }

  addUser(validationForm: any) {
    this.isInProgress = true;
    let setNumTelType = validationForm.form.get('numTel').value;
    validationForm.controls['numTel'].setValue(setNumTelType.internationalNumber);
    let token = this.tokenStorage.getToken();
    this.proService.addUser(token,this.userForm).subscribe(data => {
        this.isInProgress = false;
        this.router.navigate(['pro-management']);
        this.alertService.success('L\'utilisateur '+ this.userForm.nom + ' a bien été ajouté.', true);
      },
      err => {
        this.addUserFailed = true;
        this.isInProgress = false;
        this.errorFieldType = err.error.violations[0].propertyPath;
        this.errorMessage = err.error.violations[0].title;
        this.formError(validationForm , this.errorFieldType, this.errorMessage  );
      }
    );
  }

  formError(validationForm:any, errorFieldType: string, errorMessage: string){
    if (errorFieldType === 'email'){
      validationForm.form.controls['email'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
      validationForm.control.markAllAsTouched();
    }
    else if (errorFieldType === 'nom'){
      validationForm.form.controls['nom'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
      validationForm.control.markAllAsTouched();
    }
    else if (errorFieldType === 'numTel'){
      validationForm.form.controls['phone'].setErrors({'incorrect': true});
      this.alertService.error(errorMessage ,[] );
      validationForm.control.markAllAsTouched();
    }
  }
}
