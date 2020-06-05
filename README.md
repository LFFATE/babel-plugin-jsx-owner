Adds `__source` to every JSX element with next data: 

```
{
    name: string,
    parentProps: any
}
```

It allows you to handle children's parent component with name* and props

* name - not actually component's name (function or class), this is a file name with path. For example: `product/grid-list/ProductGridList` 
* works only if component placed at `src/components` path

Feel free to fork and change this settings.

There is probability of some issues due to `__source` is reserved react property.

```sh
npm install -D babel-plugin-jsx-owner
```

```sh
yarn add -D babel-plugin-jsx-owner
```