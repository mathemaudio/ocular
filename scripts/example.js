/**
 * Created by Shalmu Y. on 14.06.2015.
 */
/* @flow */
"use strict";
function example() {
  /**
   * Create an ocular unit test module.
   */
  Ocular('exampleModule', function myTest(T) {
    T(Math.pow(2, 2) == 4); // the whole experssion will be shown!
    T('some string' != 'another string');
    T(Math.random()==2);
    T(123 > 11);
    T(11==Date.now());
  });
}