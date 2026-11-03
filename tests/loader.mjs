export async function resolve(specifier, context, nextResolve) {
  let target = specifier;

  if (target.startsWith("@/")) {
    target = new URL(`../src/${target.slice(2)}`, import.meta.url).href;
  }

  if (
    (target.startsWith("./") || target.startsWith("../")) &&
    !/\.(ts|tsx|js|mjs|cjs|json)$/.test(target)
  ) {
    try {
      return await nextResolve(`${target}.ts`, context);
    } catch {
      // segue para a resolução normal
    }
  }

  return nextResolve(target, context);
}
