import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, TabHighlight } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

/**
 * Generated class for the IncluirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incluir',
  templateUrl: 'incluir.html',
})
export class IncluirPage {

  public form:FormGroup;
  public nome:any;
  public login:any;
  public endereco:any;
  public senha:any;
  public isEdited:boolean = false;
  public hideForm:boolean = false;
  public pageTitle:string;
  private baseURI:string  = "http://localhost/dadosPhp/manage-data.php";
  public recordID:any = null;



  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient, public fb:FormBuilder, public toastCtrl:ToastController){

    this.form = fb.group({
      "id": ["",Validators.required],
      "login": ["",Validators.required],
      "senha": ["",Validators.required],
      "nome": ["",Validators.required],
      "endereco": ["",Validators.required]
    })
  }

  ionViewWillEnter():void{
    this.resetFields();

    if(this.navParams.get("record")){
      this.isEdited = true;
      this.selectEntry(this.navParams.get("record")); 
      this.pageTitle = 'entry';
    }
    else{
      this.isEdited = false;
      this.pageTitle = 'create';
    }
  }

  selectEntry(item : any) : void
   {
      this.recordID  = item.id_usu;
      this.login = item.login_usu;
      this.senha = item.senha_usu;
      this.nome = item.nome_usu;
      this.endereco = item.endereco_usu;
   }

   createEntry(recordID:any, login : string, senha:string, nome : string, endereco:string) : void
   {
     
      let headers 	: any		= new HttpHeaders ({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "id" : recordID, "login" : login, "senha":senha, "nome":nome,"endereco":endereco },
          url       : any   = this.baseURI;

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations the : ${login} was successfully added`);
      },
      (error : any) =>
      { 
        console.log(error);
         
         this.sendNotification('Something went wrong!');
      });
   }


   updateEntry(recordID:any, login : string, senha:string, nome : string, endereco:string) : void
   {
      let headers : any		= new HttpHeaders ({ 'Content-Type': 'application/json' }),
      options 	  : any		= { "key" : "update", "id" : recordID, "login" : login, "senha":senha, "nome":nome, "endereco":endereco},
      url         : any   = this.baseURI;

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations the technology: ${login} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }





   deleteEntry() : void
   {
      let id        : string 	= this.form.controls["id"].value,
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete", "recordID" : this.recordID},
          url       : any      	= this.baseURI;

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm = true;
         this.sendNotification(`Congratulations the technology was successfully deleted`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }

   saveEntry() : void
   {
      let id         : string = this.form.controls["id"].value,
          login      : string    = this.form.controls["login"].value,
          senha      : string    = this.form.controls["senha"].value,
          nome       : string    = this.form.controls["nome"].value,
          endereco   : string    = this.form.controls["endereco"].value;

      if(this.isEdited)
      {
         this.updateEntry(id,login,senha,nome,endereco);
         
      }
      else
      {
         this.createEntry(id,login,senha,nome,endereco);
      }
   }

   resetFields() : void
   {
      this.recordID = "";
      this.login    = "";
      this.senha    = "";
      this.nome     = "";
      this.endereco = "";
   }
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

   formatarImagem(){
     
   }
}