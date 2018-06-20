import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public getUrl = window.location;
  public baseUrl = this.getUrl.protocol + "//" + this.getUrl.host + "/" + this.getUrl.pathname.split('/')[1];
  public urlFinal;
  public items : Array<any> = [];

  constructor(public navCtrl: NavController, public http:HttpClient) {
   

  }

  ionViewWillEnter():void 
  {
    this.load();
  }

  load(){

    this.http.get('http://localhost/dadosPhp/retrieve-data.php').subscribe((data : any) =>{
     

      this.items = data;

      
      
      return this.items;
      
    }
  
  );

  }

  viewEntry(param : any) : void
   {
      this.navCtrl.push('IncluirPage', param);
   }

}
