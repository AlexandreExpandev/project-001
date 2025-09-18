/**
 * @function setDefaultProps
 * @description Mescla as propriedades fornecidas com as propriedades padrão.
 * As propriedades em `props` têm precedência sobre as de `defaultProps`.
 *
 * @template T
 * @param {Partial<T>} props - As propriedades fornecidas ao componente.
 * @param {T} defaultProps - As propriedades padrão do componente.
 * @returns {T} Um novo objeto com as propriedades mescladas.
 */
export const setDefaultProps = <T extends object>(props: Partial<T>, defaultProps: T): T => {
  return { ...defaultProps, ...props };
};
