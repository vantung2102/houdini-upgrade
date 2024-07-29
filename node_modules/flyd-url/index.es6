import flyd from 'flyd'
import url from 'url'

let href = location.href
let stream = flyd.stream(url.parse(href))
let target = Date.now()
let dur = 50

const poll = () => {
  if(stream.end()) return
  let now = Date.now()
  target += dur
  if(href !== location.href) {
    stream(url.parse(location.href))
    href = location.href
  }
  setTimeout(poll, target - now)
}
poll()

module.exports = stream

