
Creates a stream with values from streams lined up with each other. For example
if you have two streams with values [1, 2, 3] and [4, 5, 6, 7], the result
stream will emit [1, 4], [2, 5], and [3, 6]. The result stream will emit the
next value only when it has at least one value from each source.


```js
const s1 = flyd.stream()
const s2 = flyd.stream()
const zipped = zip([s1, s2])
s1(1)
s2(2)
zipped() // [1, 2]
s2(3)
zipped() // [1, 2] -- s1 still has old value so zipped does not change
s1(4)
zipped() // [4, 3]
```


Zip is not like lift, because lift will give you a pair for every new value:

```js
const s1 = flyd.stream()
const s2 = flyd.stream()
const lifted = lift((v1, v2) => [v1, v2], s1, s2)

s1(1)
s2(2)
lifted() // [1,2]
s2(3)    // [1,3]
```

Lift will give you a pair for any new value on any new stream. Instead, zip gives you only pairs of *new* values, where both values have to be new to produce a new pair on the zipped stream.
