/**
 * Created by Shalmu Y. on 14.06.2015.
 */
/* @flow */
"use strict";

/**
 * @param {string} moduleName
 * @param {function(function())} testFn
 */
function Ocular(moduleName, testFn) {
  /**
   * This array will collect all mistakes
   * @type {Array}
   */
  const mistakes = [];
  /**
   * The string represetation of function contents to be parsed
   * @type {string}
   */
  const fn = testFn.toString();

  /**
   * find a string in "str" between "a" and "b"
   * @param {string} str
   * @param {string} a
   * @param {string} b
   * @returns {string}
   */
  function getBetweenClose(str, a, b) {
    const parts = str.split(a);
    parts.shift();
    return parts.join(a).split(b).shift();
  }

  /**
   * find a string in "str" between "a" and "b"
   * @param {string} str
   * @param {string} a
   * @param {string} b
   * @returns {string}
   */
  function getBetweenFar(str, a, b) {
    const parts = str.split(a);
    parts.shift();
    const parts2 = parts.join(a).split(b);
    parts2.pop();
    return parts2.join(b);
  }

  /**
   * trim char from the end of str
   * @param {string} str
   * @param {string} char
   * @param {boolean} oneOnly - if yes, then remove only one char from the end
   * @returns {string}
   */
  function trimR(str, char, oneOnly) {
    if (str == '')return '';
    while (str.substr(str.length - 1, 1) == char) {
      str = str.substr(0, str.length - 1);
      if (oneOnly)break;
    }
    return str;
  }


  /**
   * the test name - extracted from a function name passed.
   * If the function is anonymous - no name is given to this test.
   * @type {string}
   */
  const testName = getBetweenClose(fn, ' ', '(');

  /**
   * the name of the "assert" function.
   * I recommend you to use one character name, like "T", for the sake of clarity
   * @type {string}
   */
  const T = getBetweenClose(fn, '(', ')');

  if (T.indexOf(',') != -1)
    mistakes.push('Your Ocular function must have one parameter only, "assert" function');


  /**
   * the function contents, which will be evaluated later
   * @type {string}
   */
  var cont = getBetweenFar(fn, '{', '}').trim();

  /**
   * removes "what" characters after the assert function call
   * @param {string} what
   */
  function removeAfterT(what) {
    what.split('').forEach(function (w) {
      while (cont.indexOf(T + w) >= 0)
        cont = cont.split(T + w).join('T');
    });
  }

  /**
   * should remove all space characters after the assert function calls for easier parsing
   */
  for (var i = 0; i < 10; ++i)
    removeAfterT(' \n\r\t');


  /**
   * collection of expressions, ready to be evaluated.
   * @type {Array<string>}
   */
  const lines = cont
    .split('\n')
    // remove ending comments if any:
    .map(function (v) {
      if (v.indexOf('//') != -1)
        return v.split('//').shift();
      else
        return v;
    })
    // first remove all commented lines:
    .filter(function (v) {
      return v.trim().indexOf('//') != 0;
    })
    .join('\n')
    // split by expressions now:
    .split(T + '(')
    // then remove all excessive ending characters:
    .map(function (v) {
      v = trimR(v.trim(), ';', false);
      v = trimR(v.trim(), ')', true);
      return v.trim();
    })
    // eventually remove emtpy lines we ended up with, if any:
    .filter(function (v) {
      return v != '';
    });

  /**
   * the HTML to display. Will be filled by "display" function later.
   * @type {string}
   */
  var out = '';

  /**
   * displays a given expression as a colorized code block with "OK/FAILED" note at the right.
   * NOTICE: ALL STYLES ARE INLINED, FOR THE SAKE OF USAGE SIMPLICITY!
   * @param {string} ex - experssion to display
   * @param {boolean} ok - green or red?
   */
  function display(ex, ok) {
    var clr = ok ? '#0a0' : '#f00';
    var clrFg = ok ? '#afa' : '#fcc';
    out += '<pre style="'
      + 'border-radius: 8px; '
      + 'font-size: 14px; '
      + 'margin: 4px; '
      + 'margin-left: 40px; '
      + 'padding: 4px; '
      + 'box-shadow: 0px 1px 2px #777; '
      + 'display: inline-block; '
      + 'border: 0px; '
      + 'background-color: ' + clrFg + '; '
      + '">'
      + ex
      + '        '
      + '<b style="color: ' + clr + ';font-size:16px;">'
      + (ok ? '&#10003; OK' : '&#10007; FAILED') + '</b></pre><br>\n';
  }


  if (mistakes.length > 0) {
    mistakes.forEach(function (m) {
      display(m, false);
    });
  } else {
    out += '<pre style="font-size: 20px;margin-left: 20px;">'
      + 'Ocular Unit Test <b>"' + moduleName + (testName ? '.' : '') + testName + '"</b></pre>';
    /**
     * find if expression is correct and display it along with beautiful colorization
     */
    lines.forEach(function (ex) {
      var ok = false;
      eval('ok = ' + ex);
      display(ex + ';', ok);
    });
  }
  document.write(out);
}
