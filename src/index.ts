import { ExecException, exec } from 'child_process';
import getExecutablePath from 'getExecutablePath';

const executablePath = getExecutablePath();

interface JDiffOptions {
    verbose?: boolean;
    listing?: boolean;
    regions?: boolean;
    console?: boolean;
    better?: boolean;
    best?: boolean;
    lazy?: boolean;
    lazier?: boolean;
    sequentialSource?: boolean;
    sequentialDest?: boolean;
    searchSize?: number;
    indexSize?: number;
    blockSize?: number;
    bufferSize?: number;
    searchMin?: number;
    searchMax?: number;
}

interface JDiffResultSuccess {
    success: true;
    message: string;
}

interface JDiffResultFailure {
    success: false;
    message: string;
    error?: ExecException;
    stdout?: string;
    stderr?: string;
}

export type JDiffResult = JDiffResultSuccess | JDiffResultFailure;

/**
 * Create a diff file between a source file and a destination file.
 * @param sourceFile The path to the source file.
 * @param destinationFile The path to the destination file.
 * @param diffFile The path where the diff file will be created.
 * @param options Optional options to customize the behavior of the jdiff tool.
 * @returns A promise that resolves with the result of the operation.
 */
export function createDiff(sourceFile: string, destinationFile: string, diffFile: string, options?: JDiffOptions): Promise<JDiffResult> {
    const command = `${executablePath} -j ${buildOptionsString(options)} ${sourceFile} ${destinationFile} ${diffFile}`;
    return executeCommand(command);
}

/**
 * Apply a diff file to a source file and produce a destination file.
 * @param sourceFile The path to the source file.
 * @param diffFile The path to the diff file.
 * @param destinationFile The path where the destination file will be created.
 * @param options Optional options to customize the behavior of the jdiff tool.
 * @returns A promise that resolves with the result of the operation.
 */
export function applyDiff(sourceFile: string, diffFile: string, destinationFile: string, options?: JDiffOptions): Promise<JDiffResult> {
    const command = `${executablePath} -u ${buildOptionsString(options)} ${sourceFile} ${diffFile} ${destinationFile}`;
    return executeCommand(command);
}

function buildOptionsString(options?: JDiffOptions): string {
    let optionsString = '';
    if (options) {
        for (const [key, value] of Object.entries(options)) {
            if (value === true) {
                optionsString += `-${key} `;
            } else if (typeof value === 'number') {
                optionsString += `-${key} ${value} `;
            }
        }
    }
    return optionsString.trim();
}

function executeCommand(command: string): Promise<JDiffResult> {
    return new Promise((resolve) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                resolve({ success: false, message: error.message, error, stdout, stderr});
            } else {
                resolve({ success: true, message: stdout });
            }
        });
    });
}
