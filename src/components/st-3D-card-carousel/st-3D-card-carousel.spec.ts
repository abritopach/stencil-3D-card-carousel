import { flush, render } from '@stencil/core/testing';
import { St3DCardCarousel } from './st-3D-card-carousel';

describe('st-3D-card-carousel', () => {
  it('should build', () => {
    expect(new St3DCardCarousel()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [St3DCardCarousel],
        html: '<st-3D-card-carousel></st-3D-card-carousel>'
      });
    });

    it('should be an array', () => {
      expect(Array.isArray(element.slides)).toBe(true);
    })

    it('should work without parameters', () => {
      //console.log(element.slides);
      expect(element.slides).toEqual([]);
    });

    it('should work with parameters', async () => {
      element.slides = [
        {
            id: 1,
            title: 'User 1',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#1abc9c',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'http://oxygennacdn3.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
            currentPlacement: 0
        },
        {
            id: 2,
            title: 'User 2',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#e67e22',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/d2/7b/4f/d27b4fa995194a0c77b8871a326a7c0b.jpg',
            currentPlacement: 60
        }
      ];
      await flush(element);
      let slides = [
        {
            id: 1,
            title: 'User 1',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#1abc9c',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'http://oxygennacdn3.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
            currentPlacement: 0
        },
        {
            id: 2,
            title: 'User 2',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#e67e22',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/d2/7b/4f/d27b4fa995194a0c77b8871a326a7c0b.jpg',
            currentPlacement: 60
        }
      ];
      expect(element.slides).toEqual(slides);
    });

    it('should prepend elements to array', async () => {
    
      let originalArray = [
        {
            id: 1,
            title: 'User 1',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#1abc9c',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'http://oxygennacdn3.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
            currentPlacement: 0
        },
        {
            id: 2,
            title: 'User 2',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#e67e22',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/d2/7b/4f/d27b4fa995194a0c77b8871a326a7c0b.jpg',
            currentPlacement: 60
        }
      ];

      element.slides = [
        {
            id: 1,
            title: 'User 1',
            description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
            country: 'Spain',
            color: '#1abc9c',
            isSelected: false,
            imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
            backgroundImgUrl: 'http://oxygennacdn3.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
            currentPlacement: 0
        }
      ];

      await flush(element);
    
      let actualJSON = JSON.stringify(originalArray);
      let expectedJSON = JSON.stringify(element.slides);
    
      expect(actualJSON).toEqual(expectedJSON);
    });

  });
});