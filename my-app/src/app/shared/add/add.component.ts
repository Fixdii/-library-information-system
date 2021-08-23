import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';


export interface ColumnConfig {
  id: string;
  name: string;
  type: 'combo' | 'text';
  value?: string;
  isHidden?: boolean;
  data?: {
    id: string;
    name: string;
  };
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  options: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {request: (body: any) => Observable<any>, columnConfigs: ColumnConfig[]},
    fb: FormBuilder,
    private httpService: HttpService
  ) {
    let config = {};
    data.columnConfigs.forEach(elem => {
      config[`${elem.id}`] = elem.value ? new FormControl(elem.value) : new FormControl();
    });
    
    this.options = fb.group(config);
  }
  

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {  
    
    this.data.request(this.options.value).subscribe(data => {
      this.dialogRef.close();
    });
    
  }
}
