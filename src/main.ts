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

      document.addEventListener('DOMContentLoaded', () => {
        const observer = new MutationObserver(() => {
          const main = document.getElementById('main');
          if (main) {
            observer.disconnect();
            main.innerHTML = ''; // eliminar línea si el contenido debe añadirse a main en lugar de reemplazar todo el contenido
            const appRoot = document.createElement('app-root');
            main.appendChild(appRoot);

            bootstrapApplication(AppComponent, appConfig).catch((err) =>
              console.error('Error al inicializar Angular:', err)
            );
          }
        });

        observer.observe(document.body, { childList: true, subtree: true });
      });
    })
    .catch((err) => {
      console.error('Error al cargar el HTML dinámico:', err);
    });
}

bootstrapGencat();
