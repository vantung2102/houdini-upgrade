
This gives you a stream of url data for the page. Every time the url changes you will get a new url data object on the stream.

The url data object comes from the [url](https://www.npmjs.com/package/url) npm module. Please reference documentation for that module to handle the url objects on the stream


```js
import flyd from 'flyd'
import urlStream from 'flyd-url'

flyd.map(
  url => console.log('Url has been updated: ', url)
, urlStream
)
```
