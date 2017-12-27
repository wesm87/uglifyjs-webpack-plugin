/* eslint-disable
  import/order
 */

import webpack from './helpers/compiler';
import { cleanErrorStack } from './helpers';
import UglifyJsPlugin from '../src/index';

describe('Errors', () => {
  test('ValidationError', async () => {
    const config = {
      plugins: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              invalid: true,
            },
          },
        }),
      ],
    };

    const stats = await webpack('entry.js', config);
    const { assets } = stats.compilation;

    const errors = stats.compilation.errors.map(cleanErrorStack);
    const warnings = stats.compilation.warnings.map(cleanErrorStack);

    expect(errors).toMatchSnapshot();
    expect(warnings).toMatchSnapshot();

    for (const asset in assets) {
      if (assets[asset]) {
        expect(assets[asset].source()).toMatchSnapshot();
      }
    }
  });

  test('Uglify Errors', async () => {
    const config = {
      plugins: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              invalid: true,
            },
          },
        }),
      ],
    };

    const stats = await webpack('entry.js', config);
    const { errors } = stats.compilation;

    expect(errors[0].message).toEqual(expect.stringContaining('from UglifyJs'));

    // const pluginEnvironment = new PluginEnvironment();
    // const compilerEnv = pluginEnvironment.getEnvironmentStub();
    // compilerEnv.context = '';

    // const plugin = new UglifyJsPlugin({
    //   uglifyOptions: {
    //     output: {
    //       'invalid-option': true,
    //     },
    //   },
    // });
    // plugin.apply(compilerEnv);
    // const [eventBinding] = pluginEnvironment.getEventBindings();

    // const chunkPluginEnvironment = new PluginEnvironment();
    // const compilation = chunkPluginEnvironment.getEnvironmentStub();
    // compilation.assets = {
    //   'test.js': {
    //     source: () => 'var foo = 1;',
    //   },
    // };
    // compilation.errors = [];

    // eventBinding.handler(compilation);
    // const [compilationEventBinding] = chunkPluginEnvironment.getEventBindings();

    // compilationEventBinding.handler(
    //   [
    //     {
    //       files: ['test.js'],
    //     },
    //   ],
    //   () => {
    //     expect(compilation.errors.length).toBe(1);
    //     expect(compilation.errors[0]).toBeInstanceOf(Error);
    //     expect(compilation.errors[0].message).toEqual(
    //       expect.stringContaining('from UglifyJs')
    //     );
    //   }
    // );
  });
});
