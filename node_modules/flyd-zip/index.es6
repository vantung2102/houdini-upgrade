import flyd from 'flyd'
import R from 'ramda'

// We need to index each stream and build up a buffer of changes to track whether all streams have changed
module.exports = (sources) => {
  let withIdxs = R.addIndex(R.map)((s, i) => flyd.map(v => [v, i], s), sources)
  let buffer = []
  return flyd.combine(function() {
    const changes = R.last(arguments)
    R.map(
      R.apply((val, idx) => {buffer[idx] = val})
    , R.map(R.call, changes)
    )
    if(R.filter(n => n !== undefined, buffer).length === sources.length) {
      const self = arguments[arguments.length-2]
      self(buffer)
      buffer = []
    }
  }, withIdxs)
}

