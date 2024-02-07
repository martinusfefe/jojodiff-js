// post install script
// build jdiff C files into an executable
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

console.log("Running post install script...");

const basePath = path.join(__dirname, '..');

const platform = os.platform()
let arch;
if (os.arch().includes('64')) {
        arch = '64';
} else {
        arch = '32';
}

console.log('Platform:', platform);
console.log('Arch:', arch);

const executablePath = path.join(basePath, 'bin', platform, arch);
let executableName = 'jdiff';
if (platform === 'win32') {
    executableName += '.exe';
}
const executable = path.join(executablePath, executableName);
fs.mkdirSync(executablePath, { recursive: true });

const cDir = path.join(basePath, 'jdiff');

console.log('Building jdiff executable...');
execSync("make", { cwd: cDir });

console.log('Copying jdiff executable...');
const cExecutable = path.join(cDir, executableName);
fs.copyFileSync(cExecutable, executable);

console.log('Cleaning up...');
execSync("make clean", { cwd: cDir });

console.log('Done.');
