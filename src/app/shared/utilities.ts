import { AlgorithmicSystemCard } from '../interfaces/cards';

/**
 * Returns the color associated with the given state.
 *
 * @export
 * @param {string} state
 * @return {*}  {string}
 */
export function getStateColor(state: string): string {
  const stateColorConfig: Record<string, string> = {
    'En producció': 'Green',
    'En desenvolupament': 'Yellow',
    'Desmantellat': 'Red',
  };
  return stateColorConfig[state];
}

/**
 * Returns the name of the algorithm associated with the given ID.
 *
 * @export
 * @param {number} algorithmId
 * @param {AlgorithmicSystemCard[]} algorithmicSystems
 * @return {*}  {string}
 */
export function getAlgorithmNameByID(
  algorithmId: number,
  algorithmicSystems: AlgorithmicSystemCard[]
): string {
  const algorithmicSystemName =
    algorithmicSystems.find(
      (algorithmicSystem) => algorithmicSystem.id === algorithmId
    )?.title ?? '';
  return algorithmicSystemName;
}
