const os = require("os");
console.log("Free memory is", os.freemem());
console.log("Total memory is",os.totalmem());
console.log("Version",os.version());
console.log("Processor",os.cpus());