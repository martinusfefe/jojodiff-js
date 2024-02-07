"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDiff = exports.createDiff = void 0;
const child_process_1 = require("child_process");
const getExecutablePath_1 = __importDefault(require("./getExecutablePath"));
const executablePath = (0, getExecutablePath_1.default)();
const flagMapping = {
    verbose: 'v',
    extraVerbose: 'vv',
    ultraVerbose: 'vvv',
    listing: 'l',
    regions: 'r',
    better: 'b',
    best: 'bb',
    lazy: 'f',
    lazier: 'ff',
    sequentialSource: 'p',
    sequentialDest: 'q',
    searchSize: 'a',
    indexSize: 'i',
    blockSize: 'k',
    bufferSize: 'n',
    searchMin: 'n',
    searchMax: 'x',
};
/**
 * Create a diff file between a source file and a destination file.
 * @param sourceFile The path to the source file.
 * @param destinationFile The path to the destination file.
 * @param diffFile The path where the diff file will be created.
 * @param options Optional options to customize the behavior of the jdiff tool.
 * @returns A promise that resolves with the result of the operation.
 */
function createDiff(sourceFile, destinationFile, diffFile, options) {
    const command = `${executablePath} -j ${buildOptionsString(options)} ${sourceFile} ${destinationFile} ${diffFile}`;
    return executeCommand(command);
}
exports.createDiff = createDiff;
/**
 * Apply a diff file to a source file and produce a destination file.
 * @param sourceFile The path to the source file.
 * @param diffFile The path to the diff file.
 * @param destinationFile The path where the destination file will be created.
 * @param options Optional options to customize the behavior of the jdiff tool.
 * @returns A promise that resolves with the result of the operation.
 */
function applyDiff(sourceFile, diffFile, destinationFile, options) {
    const command = `${executablePath} -u ${buildOptionsString(options)} ${sourceFile} ${diffFile} ${destinationFile}`;
    return executeCommand(command);
}
exports.applyDiff = applyDiff;
function buildOptionsString(options) {
    let optionsString = '';
    if (options) {
        for (const [key, value] of Object.entries(options)) {
            if (value === true) {
                const flag = flagMapping[key];
                optionsString += `-${flag} `;
            }
            else if (typeof value === 'number') {
                const flag = flagMapping[key];
                optionsString += `-${flag} ${value} `;
            }
        }
    }
    return optionsString.trim();
}
function executeCommand(command) {
    return new Promise((resolve) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error === null || error === void 0 ? void 0 : error.message) {
                resolve({ success: false, message: error.message, error, stdout, stderr });
            }
            else {
                resolve({ success: true, message: stdout });
            }
        });
    });
}
