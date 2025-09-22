const os = require( 'os' );

//! os.platform() -> 'win32' | 'linux' | 'darwin' -> to get the platform
const platform = os.platform();
console.log( platform, "\n" )

//! os.arch() -> 'x64' | 'x32' | 'arm' | 'arm64' -> to get the architecture
const arch = os.arch();
console.log( arch, "\n" )

//! os.homedir() -> 'C:\Users\Admin' | '/home/admin' -> to get the path of home directory
const homeDir = os.homedir();
console.log( homeDir, "\n" )

//! os.freemem() -> 123456789 -> to get the free memory in bytes
const freeMemory = os.freemem();
console.log( freeMemory, "\n" )

//! os.totalmem() -> 123456789 -> to get the total memory in bytes
const totalMemory = os.totalmem();
console.log( totalMemory, "\n" )

//! os.cpus() -> [ { model: 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz', speed: 1596, times: { user: 123456, nice: 123456, sys: 123456, idle: 123456, irq: 123456 } } ] -> to get the cpu information
const cpus = os.cpus();
console.log( os.cpus() )