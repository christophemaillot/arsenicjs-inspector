const nunjucks = require('nunjucks')
const moment = require('moment')

const defaultOptions = {
    "path" : "/_inspector/"
}

const now = () => new Date().getTime()

function inspectorFilter(config) {

    const requests = []

    var env = nunjucks.configure()
    env.addFilter("ts", (str) => {
        return moment(parseInt(str)).format("YYYY-MM-DD&nbsp;HH:mm:SS")
    })


    config = Object.assign(defaultOptions, config)

    return (req, res, next) => {
        if (req.path.startsWith(config.path)) {

            if (req.path == config.path + "clean") {
                while(requests.length > 0) {
                    requests.pop();
                }
            }

            const body = nunjucks.render(__dirname + "/templates/index.njk", {requests})
            res.body(body).end()
        } else {
            let item = {}
            item.method = req.method,
            item.path = req.path,
            item.timestamp = now()
            requests.push(item)

            let t0 = Date.now()
            next(req, res);            
            let t1 = Date.now()

            item.status = res.res.statusCode
            item.duration = (t1-t0)
        }
    }
}


module.exports = inspectorFilter