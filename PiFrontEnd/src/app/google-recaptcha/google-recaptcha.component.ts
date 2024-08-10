import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-google-recaptcha',
  templateUrl: './google-recaptcha.component.html',
  styleUrls: ['./google-recaptcha.component.css']
})
export class GoogleRecaptchaComponent implements OnInit {
  protected aFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }
  siteKey: string = '6LevP4spAAAAAGORJ4Z3vjGfitgthh0dJjsHyOWE';

}
