export function deepMerge(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  source: Record<any, any>,
  target: Record<any, any> | undefined,
) {
  const result = { ...target, ...source };
  const keys = Object.keys(result);

  if (target) {
    for (const key of keys) {
      const targetProp = target[key];
      const sourceProp = source[key];

      if (typeof targetProp == 'object' && typeof sourceProp == 'object') {
        result[key] = deepMerge(targetProp, sourceProp);
      }
    }
  }

  return result;
}
