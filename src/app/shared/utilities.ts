/**
 * Returns the color associated with the given state.
 *
 * @param {string} state The state whose associated color is to be retrieved.
 * @return {string} The color associated with the given state (e.g., 'Green', 'Yellow', 'Red').
 * @memberof AlgorithmsRegistryService
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
 * Returns a normalized string, removing accents and converting to lowercase.
 *
 * @param {(string | undefined)} text The input string to be normalized. If `undefined`, an empty string will be returned.
 * @return {string} The normalized string without accents and in lowercase.
 * @memberof AlgorithmsRegistryService
 */
export function normalized(text: string | undefined): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
