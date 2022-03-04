import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  formGroup: FormGroup;
  subscribers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AuthFormComponent>,
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {
    this.formGroup = this.fb.group({
      full_name: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });
  }

  submit() {
    const formFullName = this.formGroup.value.full_name
      .split(' ')
      .join('')
      .toLowerCase();
    const formCardNumber = +this.formGroup.value.cardNumber;    

    this.servicesService.getSubscriber().subscribe((data: any[]) => {
      this.subscribers = data;
      
      for (let obj of data) {        
        if (obj.full_name.split(' ').join('').toLowerCase() === formFullName && obj.library_card == formCardNumber) {
          this.closeDialog(true);
          return;
        }
      }
      alert('Пожалуйста введите правильные данные !!!')
    });   

    this.formGroup.reset();    
  }

  ngOnInit(): void {}

  closeDialog(v: boolean): void {
    this.dialogRef.close(v);
    this.formGroup.reset();
  }
}
