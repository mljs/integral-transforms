import { BorderType, fftConvolution } from 'ml-convolution';
import { getShape1D, Shape1D } from 'ml-peak-shape-generator';
import { xNormed } from 'ml-spectra-processing';

/**
 * This function returns a broadened spectrum
 * @param array - The original spectrum
 * @param options - options
 * @returns - broadened spectrum
 */

export function integralTransform(array: number[], options: Options = {}) {
  const {
    shape = { kind: 'gaussian' },
    kernelWidth = 7,
    normalized = false,
    kernelHeight = 1,
    maxHeight = 1,
  } = options;
  const kernelBasis = getShape1D({ ...shape, fwhm: kernelWidth });
  const kernel = kernelBasis.getData({
    length: kernelWidth,
    height: kernelHeight,
  });
  const result = fftConvolution(array, kernel, 'CONSTANT' as BorderType);
  return normalized
    ? xNormed(result, { algorithm: 'max', value: maxHeight })
    : result;
}

interface Options {
  shape?: Shape1D;
  kernelWidth?: number;
  normalized?: boolean;
  kernelHeight?: number;
  maxHeight?: number;
}
