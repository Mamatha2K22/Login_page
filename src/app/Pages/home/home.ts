import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from '@angular/forms';







@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule,FormsModule,InputIconModule, TableModule,ToastModule,IconFieldModule, ButtonModule, ConfirmDialogModule,ReactiveFormsModule],
  templateUrl: './home.html',
  providers:[MessageService,ConfirmationService],
  styleUrl: './home.css'
})
export class Home {

  userList:any[]=[];
  inputValue:string='';
  selectedRow: any;
  searchId!:FormGroup;
  foundPost: any = null;
  errorMessage: string = '';

  
  

  private apiservice=inject(ApiService);
  private route=inject(ActivatedRoute);

  constructor(private messageService:MessageService,private confirmationService: ConfirmationService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.userList=this.route.snapshot.data['preload'];

    this.searchId = this.fb.group({
  id: ['']  //  correct when using FormBuilder
});

    
  }

  onRowSelect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.id ,life:6000});
    }

  deleteProduct(product: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.id + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'No',
                severity: 'secondary',
                variant: 'text'
            },
            acceptButtonProps: {
                severity: 'danger',
                label: 'Yes'
            },
            accept: () => {
                this.userList = this.userList.filter((val) => val.id !== product.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Index'+" "+product.id+" "+ 'Deleted',
                    life: 9000
                });
            }
        });
    }

   

  
  
 
}





  




