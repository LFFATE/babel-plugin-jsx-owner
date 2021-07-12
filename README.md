Adds `__source` to every JSX element with next data: 

```
{
    name: string,
    parentProps: any
}
```

It allows you to handle children's parent component with name* and props

* name - not actually component's name (function or class), this is a file name with path. For example: `product/grid-list/ProductGridList` 
* works only if component placed at `src/components` path. to override this, use paths to specify component directories

Feel free to fork and change this settings.

There is probability of some issues due to `__source` is reserved react property.
But you can override it by plugin option (Make sure to prevent it to be passed to a real DOM): 
```
// .babelrc
{
  "presets": [
      ...
  ],
  "plugins": [
    [
      "babel-plugin-jsx-owner",
      {
        "traceId": "__source",
        /* paths where your components placed */
        "paths": ["src/components"],
        /* add prefix to all component names */
        "prefix": "sd-common-products",
      }
    ]
  ]
}

```

```sh
npm install -D babel-plugin-jsx-owner
```

```sh
yarn add -D babel-plugin-jsx-owner
```