import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

function bootstrapGencat() {
  fetch(
    `https://administraciodigital.gencat.cat/template?mode=html&code=OAD0001&idioma=ca&nocache`
  )
    .then((response) => response.text())
    .then((html) => {
      // Sobrescribimos el contenido del documento
      document.open();
      document.write(html);
      document.close();
      setTimeout(() => {
        const main = document.getElementById('main');
        if (main) {
          const appRoot = document.createElement('app-root');
          main.appendChild(appRoot);
        }
        bootstrapApplication(AppComponent, appConfig).catch((err) =>
          console.error('Error al inicializar Angular:', err)
        );
      }, 1200);
    })
    .catch((err) => {
      console.error('Error al cargar el index.html dinámico:', err);
    });
}

bootstrapGencat();
