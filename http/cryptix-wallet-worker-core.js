//import "@cryptix/wallet-worker/worker.js";
//if(typeof window == 'undefined')
	globalThis['window'] = globalThis;

require("@cryptix/wallet-worker/worker.js")
