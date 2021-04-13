const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require("worker_threads");
const os = require("os");

const threads = os.cpus().length;
const slaves = [];

let done = 0;

if (isMainThread) {
    console.time("Time");
    const numberOfElements = 1_000_000_000;
    const sharedBuffer = new SharedArrayBuffer(
        Int32Array.BYTES_PER_ELEMENT * numberOfElements
    );
    const arr = new Int32Array(sharedBuffer);
    const elementsPerThread = Math.ceil(numberOfElements / threads);
    while (slaves.length < threads) {
        const worker = new Worker(__filename, {
            workerData: {
                arr,
                start: slaves.length * elementsPerThread,
                end: slaves.length * elementsPerThread + elementsPerThread,
            },
        });
        worker.on("message", (message) => {
            if (message.done) {
                done++;
            }
            if (done === threads) {
                console.timeEnd("Time");
                console.log("Task done successfully!");
            }
        });
        slaves.push(worker);
    }
} else {
    for (let i = workerData.start; i < workerData.end; i++) {
        workerData.arr[i] = i + 2;
    }
    parentPort.postMessage({ done: `Worker ${workerData.index}` });
}
