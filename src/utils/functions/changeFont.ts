import { FONT_LIST } from '../data/fonts';

/**
 * Cambia la fuente cargando desde Google Fonts si es necesario y actualiza el estado cuando esté lista.
 * @param fontName Nombre de la fuente a cargar
 * @param setFontLoaded Función para actualizar el estado de carga de la fuente
 */
export function changeFont(fontName: string, setFontLoaded: (loaded: boolean) => void) {
  if (!FONT_LIST.includes(fontName)) {
    console.warn(`La fuente ${fontName} no está en la lista de fuentes permitidas.`);
    setFontLoaded(false);
    return;
  }

  // Si es una fuente de Google Fonts, agregamos el link
  const googleFonts = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Merriweather',
    'PT Sans', 'Noto Sans', 'Ubuntu', 'Dancing Script', 'Pacifico', 'Bebas Neue',
  ];

  if (googleFonts.includes(fontName)) {
    const fontLink = document.createElement('link');
    fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}&display=swap`;
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }

  // Esperar a que la fuente esté lista
  document.fonts.ready
    .then(() => {   
      if (document.fonts.check(`1em ${fontName}`)) {
        setFontLoaded(true);
        console.log(`La fuente ${fontName} se ha cargado correctamente.`);
      } else {
        setFontLoaded(false);
        console.warn(`La fuente ${fontName} no se ha cargado correctamente.`);
      }
    })
    .catch((err) => {
      console.error('Font loading failed:', err);
      setFontLoaded(false);
    });
}