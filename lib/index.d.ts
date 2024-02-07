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
interface JDiffResult {
    success: boolean;
    message: string;
}
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
