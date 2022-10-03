import { BorderType, fftConvolution } from 'ml-convolution';
import { getShape1D } from 'ml-peak-shape-generator';

import { yNorm } from './utilities/yNorm';

export function getbroadenedSpectrum(array: number[], options: Options = {}) {
  const {
    kind = 'gaussian',
    kernelWidth = 7,
    normalized = false,
    sd = 1.2,
    height = 1,
  } = options;
  const kernelBasis = getShape1D({ kind, sd, fwhm: kernelWidth });
  const kernel = kernelBasis.getData({
    length: kernelWidth,
    height,
  });
  const result = fftConvolution(array, kernel, 'CONSTANT' as BorderType);
  return normalized ? yNorm(result) : result;
}

interface Options {
  kind?: 'pseudoVoigt' | 'gaussian' | 'lorentzian';
  kernelWidth?: number;
  normalized?: boolean;
  sd?: number;
  height?: number;
}
