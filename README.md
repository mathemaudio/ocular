
Ocular JS
========

Ocular JS is a very simple unit testing library, which quotes the code along with results, making the test result much more descriptive and visually consistent.
=============

* Download "scripts/ocular.unit.js" file
* Add this line to your html:
		<script src="scripts/ocular.unit.js"></script>
* Create the test like this:
```javascript
  Ocular('exampleModule', function myTest(assert) {
    assert(Math.pow(2, 2) == 4); // the whole experssion will be shown!
    assert('some string' != 'another string');
    assert(Math.random()==2);
    assert(123 > 11);
    assert(11==Date.now());
  });
```

You will see something like this:

![result](https://raw.githubusercontent.com/shalmu/ocular/master/example_result.png)

Now each unit shows the code itself, which can be very useful when you have many tests.


