const a = require("./html5-cloud-sdk-v2.3.0.js");
const kii = a.create()
a.exportedClasses.map(e => global[e] = kii[e])

/* workaround for react-native */
global.XMLHttpRequest.prototype.withCredentials = {}

export default kii;
