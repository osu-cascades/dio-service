'use strict';

var fs = require('fs');

fs.createReadStream('.sample-env').pipe(fs.createWriteStream('.env'));
//# sourceMappingURL=setup.js.map