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
    shape = { kind: 'gaussian', fwhm: 7 },
    kernelHeight = 1,
    kernelWidth = 0,
    normalized = false,
    maxHeight = 1,
  } = options;
  const kernelBasis = getShape1D(shape);
  const widthFactor = Math.ceil(kernelBasis.getFactor(0.999));
  const defaultWidth = widthFactor % 2 === 0 ? widthFactor - 1 : widthFactor;
  const kernel = kernelBasis.getData({
    length: kernelWidth ? kernelWidth : defaultWidth,
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
   * @default { kind: 'gaussian', fwhm: 7 },
   */
  shape?: Shape1D;

  /**
   * By default, the factor to cover 0.999 of the surface under the shape.
   * @default
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
