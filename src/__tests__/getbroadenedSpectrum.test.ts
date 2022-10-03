import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { getbroadenedSpectrum } from '../getbroadenedSpectrum';

expect.extend({ toBeDeepCloseTo });

describe('Testing basis functions', () => {
  it('With normalization', () => {
    const input = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
      0.2, 0.1,
    ];
    const broadenedSpectrum = getbroadenedSpectrum(input, { normalized: true });
    expect(broadenedSpectrum).toBeDeepCloseTo(
      [
        0.14, 0.25, 0.37, 0.49, 0.62, 0.74, 0.86, 0.96, 1, 0.96, 0.86, 0.74,
        0.62, 0.49, 0.37, 0.25, 0.14,
      ],
      2,
    );
  });

  it('Without normalization', () => {
    const input = [
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3,
      0.2, 0.1,
    ];
    const broadenedSpectrum = getbroadenedSpectrum(input);
    expect(broadenedSpectrum).toBeDeepCloseTo(
      [
        0.33, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.33, 2.43, 2.33, 2.1, 1.8, 1.5,
        1.2, 0.9, 0.6, 0.33,
      ],
      1,
    );
  });
});
