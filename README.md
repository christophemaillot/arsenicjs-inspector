# description

ArsenicJS inspector is a debugging tool that log all requests, and adds a web UI to browse the requests.

This a development tool, must not be use in a production environment.

# installation and setup 

yarn add @arsenicjs/inspector

```
const arsenic = require('@arsenicjs/core')
const inspector = require('@arsenicjs/inspector')

const app = arsenic()

app.filter(inspector({path:"/_inspector"}))
...
app.listen(process.env.PORT)

``` 

then browse /_inspector to see the requests.

