export abstract class BaseClass {
     data: any[] = []; // This will hold posts .

  setData(data: any[]) {
    this.data = data;
  }
 // loading=false;

  abstract fetch():void;
   /*showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }*/
}
