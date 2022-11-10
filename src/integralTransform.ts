import { NumberArray } from 'cheminfo-types';
import { BorderType, fftConvolution } from 'ml-convolution';
import { getShape1D, Shape1D } from 'ml-peak-shape-generator';
import { xNormed } from 'ml-spectra-processing';

/**
 * This function returns a broadened spectrum
 * @param array - The original spectrum
 * @param options - options
 * @returns - broadened spectrum
 */

export function integralTransform(
  array: NumberArray,
  options: IntegralTransformsOptions = {},
) {
  const {
    shape = { kind: 'gaussian', sd: 3 },
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

interface IntegralTransformsOptions {
  /**
   * The shape of the kernel to perform the convolution
   * @default { kind: 'gaussian', sd: 3 },
   */
  shape?: Shape1D;

  /**
   * The width of the kernel (in number of points)
   * @default 7
   */
  kernelWidth?: number;

  /**
   * if true it will normalize the array to have the max height equal to de value defined in the options
   * @default true
   */
  normalized?: boolean;

  /**
   * Kernel height to perform the convolution
   * @default 1
   */
  kernelHeight?: number;

  /**
   * Maximum height of the vector on which the convolution will be applied
   * @default 1
   */
  maxHeight?: number;
}
