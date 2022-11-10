import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { integralTransform } from '../integralTransform';

expect.extend({ toBeDeepCloseTo });

describe('Testing basis functions', () => {
  it('With normalization', () => {
    const input = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
      0.2, 0.1,
    ];
    const broadenedSpectrum = integralTransform(input, {
      normalized: true,
      shape: { kind: 'gaussian', sd: 1.2 },
      kernelHeight: 1,
      kernelWidth: 7,
      maxHeight: 1,
    });
    expect(broadenedSpectrum).toBeDeepCloseTo(
      [
        0.14, 0.25, 0.37, 0.49, 0.62, 0.74, 0.86, 0.96, 1, 0.96, 0.86, 0.74,
        0.62, 0.49, 0.37, 0.25, 0.14,
      ],
      1,
    );
  });

  it('Without normalization', () => {
    const input = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
      0.2, 0.1,
    ];
    const broadenedSpectrum = integralTransform(input);
    expect(broadenedSpectrum).toBeDeepCloseTo(
      [
        0.77, 1.2, 1.71, 2.28, 2.85, 3.42, 3.87, 4.16, 4.26, 4.16, 3.87, 3.42,
        2.85, 2.28, 1.71, 1.2, 0.77,
      ],
      1,
    );
  });

  it('Test signal broadening using lorentzian basis', () => {
    const input = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
      0.2, 0.1,
    ];
    const broadenedSpectrum = integralTransform(input, {
      shape: { kind: 'lorentzian' },
    });
    expect(broadenedSpectrum).toBeDeepCloseTo(
      [
        0.7, 1.2, 1.7, 2.2, 2.8, 3.3, 3.74, 4.0, 4.1, 4.0, 3.7, 3.3, 2.8, 2.2,
        1.7, 1.2, 0.7,
      ],
      1,
    );
  });
});
