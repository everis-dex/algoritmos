/**
 * Returns the color associated with the given state.
 *
 * @export
 * @param {string} state
 * @return {string}
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
 * Returns a normalized string, removing accents and converting to lowercase
 *
 * @param {(string | undefined)} text
 * @return {string}
 * @memberof AlgorithmsRegistryService
 */
export function normalized(text: string | undefined): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
