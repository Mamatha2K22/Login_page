import { Component, inject, OnInit } from '@angular/core';
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
import { FormatFieldPipe } from '../format-field-pipe';
import { BaseClass } from '../base-class';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, InputIconModule, TableModule, ToastModule, IconFieldModule, ButtonModule, ConfirmDialogModule, ReactiveFormsModule, FormatFieldPipe],
  templateUrl: './home.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './home.css'
})
export class Home extends BaseClass {

  userList: any[] = [];
  inputValue: string = '';
  selectedRow: any;
  searchId!: FormGroup;
  foundPost: any = null;
  errorMessage: string = '';
  selectedRows: number[] = [];
  topThreeTitles: string[] = [];

  private route = inject(ActivatedRoute);

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private fb: FormBuilder) {
    super();
  }

  override fetch(): void {
    const preload = this.route.snapshot.data['preload'];
    const posts = preload.posts

    this.setData(posts);
  }

  ngOnInit(): void {
    //this.userList=this.route.snapshot.data['preload'];
    this.fetch();
    this.topThreeTitles = this.data
      .slice(0, 3)
      .map(item => item.title); // get top 3 titles
    this.searchId = this.fb.group({
      id: ['']  //  correct when using FormBuilder
    });


  }



  rowSelection(item: any): void {
    const userId = item.userId;
    const isSelected = this.selectedRows.includes(userId);

    this.selectedRows = isSelected
      ? this.selectedRows.filter(id => id !== userId)  // Remove userId
      : [...this.selectedRows, userId];                // Add userId
  }

  getRowClass(item: any): { [className: string]: boolean } {
    return {
      'row-selected': this.selectedRows.includes(item.userId)
    };
  }

  getRowStyle(item: any): { [key: string]: string } {
    return this.selectedRows.includes(item.userId)
      ? {
        'background-color': 'mediumaquamarine',
        'box-shadow': '0 0 10px lightblue'
      }
      : {};
  }


  /*rowSelection(item: any) {
  const index = this.selectedRows.indexOf(item.userId);
  if (this.selectedRows.includes(item.userId)) {
    this.selectedRows.splice(index, 1);
  } else {
    this.selectedRows.push(item.userId);
  }
}

  onRowSelect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.id ,life:6000});
    }
*/
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
        this.data = this.data.filter((val) => val.id !== product.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Index' + " " + product.id + " " + 'Deleted',
          life: 9000
        });
      }
    });
  }






}










