const babel = require('@babel/core');
const plugin = require('../');
const jsxPlugin = require('@babel/plugin-transform-react-jsx')
const assert = require('assert');

const example = `
import React from 'react'
import { Link } from 'react-router-dom'

import Price from '../../subcomponents/price/PriceContainer'
import AddToCartButton from '../../cart/add-to-cart-button/AddToCartButtonContainer'
import AddToWishlistButton from '../../wishlist/add-to-wishlist-button/AddToWishlistButtonContainer'
import Rating from '../../subcomponents/rating/Rating'
import Icon from '../../../entities/image-pair/Icon'
import Product from '../../../entities/product/Product'
import CartError from '../cart-error/CartErrorContainer'
import LazyLoadHandler from '../../subcomponents/lazy-load-handler/LazyLoadHandler'
import Image from '../../subcomponents/image/Image'
import ProductContext from '../../../contexts/product/ProductContext'
import noImage from '../../../images/no-image.png'
import modifyClassName from '../../../utils/string/modifyClassName'

import './ProductGridItem.css'

function ProductGridItem(props) {

  const { product } = props

  return (
    <ProductContext.Provider value={product||null}>
      <div className='b-product-grid-item'>
        {renderProductIcon(product)}
        <div className='b-product-grid-item__body'>
          <CartError product={product} />
          <Rating
            name={'product-rating' + product.id}
            rating={product.averageRating}
          />
          <div className='b-product-grid-item__price-wrapper'>
            <Price
              price={product.price}
              className='b-product-grid-item__price'
            />
            {product.listPrice && product.listPrice > product.price
              ?
                <Price
                  price={product.listPrice}
                  className='b-product-grid-item__price b-product-grid-item__price--discount'
                  discount
                />
              :
                null
            }
          </div>
          <h4 className='b-product-grid-item__title'>
            <Link
              to={product.url}
              className='b-product-grid-item__link'
            >
              {product.name}
            </Link>
          </h4>
          <AddToCartButton
            product={product}
            wrapperClassName='b-product-grid-item__add-to-cart-wrapper'
            className='b-product-grid-item__add-to-cart'
            render={() => <button />}
          />
        </div>
      </div>
    </ProductContext.Provider>
  )
}

export default ProductGridItem

`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [jsxPlugin, plugin]});
  expect(code).toMatchSnapshot();
});

// it('contains baz', () => {
//   const {ast} = babel.transform(example, {plugins: [plugin]});
//   const program = ast.program;
//   const declaration = program.body[0].declarations[0];
//   assert.equal(declaration.id.name, 'baz');
// });


// it('foo is an alias to baz', () => {
//   var input = `
//     var foo = 1;
//     // test that foo was renamed to baz
//     var res = baz;
//   `;
//   var {code} = babel.transform(input, {plugins: [plugin]});
//   var f = new Function(`
//     ${code};
//     return res;
//   `);
//   var res = f();
//   assert(res === 1, 'res is 1');
// });

