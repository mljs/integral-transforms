import max from 'ml-array-max';

export function yNorm(spectra: number[]) {
  const maxIntensity = max(spectra);
  return spectra.map((x) => x / maxIntensity);
}
