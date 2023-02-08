const babel = require('@babel/core');
const plugin = require('../');
const jsxPlugin = require('@babel/plugin-transform-react-jsx')

const getComponentPath = require('../getComponentPath').default

it('should set __owner-data for related component', () => {
  const { code } = babel.transformFileSync('src/__tests__/mocks/src/components/ProductGridItem.jsx', {
    plugins: [jsxPlugin, plugin],
  });
  expect(code).toMatchSnapshot();
});

it('should not set __owner-data for ignored component', () => {
  const { code } = babel.transformFileSync('src/__tests__/mocks/src/components/ignored/ProductGridItem.jsx', {
    plugins: [jsxPlugin, [plugin, { ignorePaths: ["ignored"] }]],
  });
  expect(code).toMatchSnapshot();
});

it('getComponentPath', () => {

  expect(getComponentPath('/src/components/wishlist/Wishlist.tsx', ['/src/components'], '', [])).toBe('wishlist/Wishlist');
  expect(getComponentPath('\\src\\components\\wishlist\\Wishlist.tsx', ['/src/components'], '', [])).toBe('wishlist/Wishlist');
  expect(getComponentPath('\\src\\__tests__\\mocks\\src\\components\\ProductGridItem.jsx', ['src/components'], '', [])).toBe('ProductGridItem');
  expect(getComponentPath('/src/components/wishlist/Wishlist.tsx', ['/src/components'], '', ['wishlist'])).toBe('');
  expect(getComponentPath('/src/components/wishlist/Wishlist.tsx', ['/src/components'], '', ['components'])).toBe('');
});

