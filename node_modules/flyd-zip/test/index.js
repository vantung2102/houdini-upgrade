var assert = require('assert')
var R = require("ramda")
var flyd = require("flyd")

var zip = require('../')

describe('flyd-zip', () => {

  const initStreams = () => {
    const streams = R.map(() => flyd.stream() , R.range(0,10))
    const zipped = zip(streams)
    return {streams, zipped}
  }

  it('handles many streams in different orders', () => {
    const x = initStreams()
    R.addIndex(R.map)((s, i) => s(i), x.streams)
    assert.deepEqual(x.zipped(), [0,1,2,3,4,5,6,7,8,9])
  })

  it('does not push to zipped stream when only some of the dependent streams have vals', () => {
    const x = initStreams()
    R.map(i => x.streams[i](i), R.range(0,4))
    assert.deepEqual(x.zipped(), undefined)
  })

  it('pushes once all dependent streams have values in any order, preserving the original order', () => {
    const x = initStreams()
    R.map(i => x.streams[i](i), R.range(0,5))
    R.map(i => x.streams[9 - i](9 - i), R.range(0,5))
    assert.deepEqual(x.zipped(), [0,1,2,3,4,5,6,7,8,9])
  })

})

