import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8090/auth',
          realm: 'clientes',
          clientId: 'app-clientes',
        },
        initOptions: {
          checkLoginIframe: true,
          checkLoginIframeInterval: 25
        },
        loadUserProfileAtStartUp: true
      });
  }