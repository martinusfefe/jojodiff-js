/// <reference types="node" />
import { ExecException } from 'child_process';
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
export declare function createDiff(sourceFile: string, destinationFile: string, diffFile: string, options?: JDiffOptions): Promise<JDiffResult>;
/**
 * Apply a diff file to a source file and produce a destination file.
 * @param sourceFile The path to the source file.
 * @param diffFile The path to the diff file.
 * @param destinationFile The path where the destination file will be created.
 * @param options Optional options to customize the behavior of the jdiff tool.
 * @returns A promise that resolves with the result of the operation.
 */
export declare function applyDiff(sourceFile: string, diffFile: string, destinationFile: string, options?: JDiffOptions): Promise<JDiffResult>;
export {};
