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
