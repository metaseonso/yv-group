// This world's start sizes for the law's one scale (Block Law 0.5). The law fixes the formula; this file fixes the inputs.
// tokensCss(inputs) and responsiveCss(inputs) from '@seonso/block-law/laws/design' write this world's custom properties.
import { defaults, type ScaleInputs } from '@seonso/block-law/laws/design';

export const inputs: ScaleInputs = {
  ...defaults,
  step0: { min: 16, max: 18 },
  ratio: { min: 1.125, max: 1.2 },
};
