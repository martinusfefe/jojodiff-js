"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
exports.default = () => {
    const basePath = path_1.default.join(__dirname, '..');
    const platform = os_1.default.platform();
    let arch;
    if (os_1.default.arch().includes('64')) {
        arch = '64';
    }
    else {
        arch = '32';
    }
    console.log('Platform:', platform);
    console.log('Arch:', arch);
    const executablePath = path_1.default.join(basePath, 'bin', platform, arch);
    let executableName = 'jdiff';
    if (platform === 'win32') {
        executableName += '.exe';
    }
    const executable = path_1.default.join(executablePath, executableName);
    if (!fs_1.default.existsSync(executable)) {
        console.error('Executable not found:', executable);
        console.log('installing jdiff...');
        (0, child_process_1.execSync)('node postInstall.js', { cwd: __dirname });
    }
    return executable;
};
