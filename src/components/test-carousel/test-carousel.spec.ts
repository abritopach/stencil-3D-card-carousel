import { flush, render } from '@stencil/core/testing';
import { TestCarousel } from './test-carousel';

describe('test-carousel', () => {
  it('should build', () => {
    expect(new TestCarousel()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [TestCarousel],
        html: '<test-carousel></test-carousel>'
      });
    });
  });
});