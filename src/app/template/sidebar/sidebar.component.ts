import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  nomeUsuario: string;

  constructor(private keycloack: KeycloakService) { }

  ngOnInit(): void {
    this.inicializa();
    this.verificaToken();
  }

  inicializa(){
    console.log(this.keycloack);
    this.nomeUsuario = this.keycloack.getUsername();
  }

  verificaToken(){
    setInterval(() => {
      console.log(this.keycloack.getKeycloakInstance().idToken);
      console.log(this.keycloack.getKeycloakInstance().authenticated);
      if(this.keycloack.isTokenExpired(300)){
        this.keycloack.getKeycloakInstance().updateToken(30);
      }
      if(this.keycloack.getKeycloakInstance().authenticated==false){
        console.log('entrou aqui');
        this.keycloack.logout('http://localhost:4200/home');
      }
    }, 10000);
  }

  logout(): void {
    this.keycloack.logout('http://localhost:4200/home');
  }

}
