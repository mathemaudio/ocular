/**
 * Created by Shalmu Y. on 14.06.2015.
 */
/* @flow */
"use strict";
function example() {
  /**
   * Create an ocular unit test module.
   */
  Ocular('exampleModule', function myTest(assert) {
    assert(Math.pow(2, 2) == 4); // the whole experssion will be shown!
    assert('some string' != 'another string');
    assert(Math.random()==2);
    assert(123 > 11);
    assert(11==Date.now());
  });
}