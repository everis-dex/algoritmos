/**
 * Returns a normalized string, removing accents and converting to lowercase.
 *
 * @param {(string | undefined)} text The input string to be normalized. If `undefined`, an empty string will be returned.
 * @param {boolean} [formatForTemplate=false] If `true`, the function applies additional formatting suitable for use in templates.
 * @return {string} The normalized string, without accents and in lowercase. If `formatForTemplate` is `true`, the string will be further transformed into a valid `id` format.
 * @memberof AlgorithmsRegistryService
 */
export function normalized(
  text: string | undefined,
  formatForTemplate?: boolean
): string {
  if (!text) return '';
  const normalizedText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (formatForTemplate)
    return normalizedText.replace(/[^a-z0-9]/g, '-').replace(/-+$/g, '');
  return normalizedText;
}
