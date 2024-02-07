import { ExecException, exec } from 'child_process';
import getExecutablePath from 'getExecutablePath';

const executablePath = getExecutablePath();

interface JDiffOptions {
    /** Verbose: greeting, results and tips. */
    verbose?: boolean;
    /** Extra Verbose: progress info and statistics. */
    extraVerbose?: boolean;
    /** Ultra Verbose: all info, including help and details. */
    ultraVerbose?: boolean;
    /** Detailed human readable output. */
    listing?: boolean;
    /** Grouped human readable output. */
    regions?: boolean;
    /** Better: use more memory, search more. */
    better?: boolean;
    /** Best: even more memory, search more. */
    best?: boolean;
    /** Lazy: no unbuffered searching (often slower). */
    lazy?: boolean;
    /** Lazier: no full index table. */
    lazier?: boolean;
    /** Sequential source (to avoid !) (with - for stdin). */
    sequentialSource?: boolean;
    /** Sequential destination (with - for stdin). */
    sequentialDest?: boolean;
    /** Size (in KB) to search */
    searchSize?: number;
    /** Size (in MB) for index table. */
    indexSize?: number;
    /** Block size in bytes for reading. */
    blockSize?: number;
    /** Size (in KB) for search buffers (0=no buffering). */
    bufferSize?: number;
    /** Minimum number of matches to search (default 2). */
    searchMin?: number;
    /** Maximum number of matches to search (default 128). */
    searchMax?: number;
}

const flagMapping: Record<keyof JDiffOptions, string> = {
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
} as const;

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
                const flag = flagMapping[key as keyof JDiffOptions];
                optionsString += `-${flag} `;
            } else if (typeof value === 'number') {
                const flag = flagMapping[key as keyof JDiffOptions];
                optionsString += `-${flag} ${value} `;
            }
        }
    }
    return optionsString.trim();
}

function executeCommand(command: string): Promise<JDiffResult> {
    return new Promise((resolve) => {
        exec(command, (error, stdout, stderr) => {
            if (error?.message) {
                resolve({ success: false, message: error.message, error, stdout, stderr});
            } else {
                resolve({ success: true, message: stdout });
            }
        });
    });
}
