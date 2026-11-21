import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scale } from '@seonso/block-law/laws/design';
import { inputs } from './scale.ts';

test('the scale inputs of this world pass the law: body floor, growth, rising steps', () => {
  assert.ok(scale(inputs).length > 0);
});
