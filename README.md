<h1 align="center" >OpenFlights loader</h1>
<p align="center">A Webpack loader for OpenFlights-formatted data</p>

<p align="center">
<a href="https://david-dm.org/danielroe/openflights-loader">
    <img alt="" src="https://david-dm.org/danielroe/openflights-loader/status.svg?style=flat-square">
</a>
<a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/openflights-loader">
    <img alt="" src="https://img.shields.io/npm/v/openflights-loader/latest.svg?style=flat-square">
</a>
<a href="https://bundlephobia.com/result?p=openflights-loader">
    <img alt="" src="https://flat.badgen.net/bundlephobia/minzip/openflights-loader">
</a>
<a href="https://lgtm.com/projects/g/danielroe/openflights-loader">
    <img alt="" src="https://flat.badgen.net/lgtm/alerts/g/danielroe/openflights-loader">
</a>
<a href="https://lgtm.com/projects/g/danielroe/openflights-loader">
    <img alt="" src="https://flat.badgen.net/lgtm/grade/g/danielroe/openflights-loader">
</a>
<a href="https://npmjs.com/package/openflights-loader">
    <img alt="" src="https://img.shields.io/npm/dt/openflights-loader.svg?style=flat-square">
</a>
</p>

## Summary

This Webpack loader allows you to load [OpenFlights formatted data](https://openflights.org/data.html).

It is not produced by OpenFlights - check them out [here](https://openflights.org/) and [here](https://github.com/jpatokal/openflights/)!

1. Add loader to your Webpack config.

   `webpack.config.js`:

   ```js
   module.exports = {
     module: {
       rules: [
         {
           test: /airports.dat$/i,
           loader: 'openflights-loader',
         },
       ],
     },
   }
   ```

2. If using TypeScript, you may add the following declaration for typed imports:

   ```ts
   declare module '*/airports.dat' {
     import { Airport } from 'openflights-loader'

     const _default: Airport[]
     export default _default
   }
   ```

**Note**: This has been developed to suit my needs but additional use cases and contributions are very welcome.

[MIT License](./LICENSE) - Copyright &copy; Daniel Roe
