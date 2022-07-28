import * as R from 'ramda';

const renameProps = (object, propMap = {}) => R.keys(object).reduce((acc, prop) => ({
  ...acc,
  [R.propOr(prop, prop, propMap)]: object[prop],
}), {});

export default renameProps;

/**
 * @tests: Uncomment and run with node to see how this function works
 */
// console.log(renameProps({ hello_world: 12, pineapple: 13 }, { hello_world: 'helloWorld' }));
// console.log(renameProps({ helloWorld: 12, pineapple: 13 }, { hello_world: 'helloWorld' }));
// console.log(renameProps({ helloWorld: 12, pineapple: 13 }, { helloWorld: 'hello_world' }));
// console.log(renameProps({ helloWorld: 12, pineapple: 13 }, { helloWorld: 'hello_world', pineapple: 'p_i_n_eAppLE' }));
