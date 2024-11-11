import { AlgorithmicSystemCard } from '../interfaces/cards';

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
    Desmantellat: 'Red',
  };
  return stateColorConfig[state];
}

/**
 * Returns the name of the algorithm associated with the given ID.
 *
 * @export
 * @param {number} algorithmicSystemId
 * @param {AlgorithmicSystemCard[]} algorithmicSystems
 * @return {*} {string}
 */
export function getAlgorithmicSystemNameById(
  algorithmicSystemId: number,
  algorithmicSystems: AlgorithmicSystemCard[]
): string | undefined {
  const algorithmicSystemName = algorithmicSystems.find(
    (algorithmicSystem) => algorithmicSystem.id === algorithmicSystemId
  )?.title;
  return algorithmicSystemName;
}
