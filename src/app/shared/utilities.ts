import { Observable } from 'rxjs';

/**
 * Returns the color associated with the given state.
 *
 * @export
 * @param {string} state
 * @return {*} {string}
 */
export function getStateColor(state: string): string {
  const stateColorConfig: Record<string, string> = {
    'Actiu': 'Green',
    'En desenvolupament': 'Yellow',
    'Inactiu': 'Red',
  };
  return stateColorConfig[state];
}

/**
 * Translates the selected text if it hasn't been translated yet and updates the translatedTexts record.
 *
 * @export
 * @param {string[]} textsSelected - The list of selected texts to be translated.
 * @param {string} currentTextSelected - The text currently selected for translation.
 * @param {Record<string, string>} translatedTexts - A record that stores the translations of texts.
 * @param {Observable<string>} textToTranslate - An observable that emits the translated text.
 * @return {void}
 */
export function translateText(
  textsSelected: string[],
  currentTextSelected: string,
  translatedTexts: Record<string, string>,
  textToTranslate: Observable<string>
): void {
  if (!textsSelected.includes(currentTextSelected))
    textsSelected.push(currentTextSelected);
  const textsToTranslate = textsSelected.filter(
    (algorithmicSystemName) => !translatedTexts[algorithmicSystemName]
  );
  if (textsToTranslate.length === 0) return;
  textToTranslate.subscribe((translatedText) => {
    translatedTexts[currentTextSelected] = translatedText;
  });
}
