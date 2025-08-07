import { Component, inject, OnInit, signal } from '@angular/core';
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

 // userList: any[] = [];
  inputValue: string = '';
  selectedRow: any;
  //searchId!: FormGroup;
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

   /*arr=['1','2','4', '1', '2', '3',3,4 ,'4'];

 Mixedcount:Map<any,number>=new Map();

countValues():void{
  for(let i=0;i<this.arr.length;i++){
    if(this.Mixedcount.has(this.arr[i])){
      this.Mixedcount.set(this.arr[i],this.Mixedcount.get(this.arr[i])!+1)
    }
    else{
      this.Mixedcount.set(this.arr[i],1);
    }
  }

}
getCount():[any,number][]{
  return Array.from(this.Mixedcount.entries());
}*/

count = signal(0);

  increment() {
    this.count.update(n => n + 1);
  }

  decrement() {
    this.count.update(n => n - 1);
  }

  reset() {
    this.count.set(0);
  }
  

   color = signal('lightblue');

  
  changeColor() {
    const colors = ['lightblue', 'lightgreen', 'lightpink', 'lightcoral', 'lightgray', 'orange', 'yellow'];
    const random = Math.floor(Math.random() * colors.length);
    this.color.set(colors[random]);
  }





}










