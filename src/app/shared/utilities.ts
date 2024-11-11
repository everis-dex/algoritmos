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
