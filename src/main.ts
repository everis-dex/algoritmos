import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from './app/app.component';

function getLang() {
  const hash = window.location.hash; // Ejemplo: "#googtrans(ca|it)"
  if (hash.startsWith('#googtrans')) {
      const languages = hash.match(/\((.*?)\)/)?.[1];
      if (languages) {
        const [sourceLang, targetLang] = languages.split('|');
        return targetLang;
    } else {
        return 'ca';
    }
  } else {
      return 'ca';
  }
}


function bootstrapGecat() {
  const lang = getLang();
  console.log(' ~ lang:', lang)

  fetch(`https://administraciodigital.gencat.cat/template?mode=html&code=OAD0001&idioma=ca}&nocache`) // Cambia por tu endpoint real
  .then(response => response.text())
  .then(html => {
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
      bootstrapApplication(AppComponent).catch(err =>
        console.error('Error al inicializar Angular:', err)
      );
    }, 1000);
  })
  .catch(err => {
    console.error('Error al cargar el index.html dinámico:', err);
  });

}

bootstrapGecat();