const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const server = 'server.js';

cluster.setupMaster({
    exec: server
})

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on('fork', (worker) => {
        console.log(`worker ${worker.pid} worker is forked`);
    });
    cluster.on('listening', (worker, address) => {
        console.log(`worker ${worker.pid} is listening on ${address.address}`);
    });
    cluster.on('online', (worker) => {
        console.log(`worker ${worker.pid} is online`);
    });
    cluster.on('disconnect', (worker) => {
        console.log(`worker ${worker.pid} is disconnected`);
    });
    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`worker ${worker.process.pid} was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`worker ${worker.process.pid} exited with error code: ${code}`);
        } else {
            console.log('worker ${worker.process.pid} success!');
        }
    });

}