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
    'En producció': 'Green',
    'En desenvolupament': 'Yellow',
    'Desmantellat': 'Red',
  };
  return stateColorConfig[state];
}
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
