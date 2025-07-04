import Transaction from "./transaction";

/**
 * The block information interface
 */


export default interface BlockInfo {
    index: number;
    previousHash: string;
    difficulty: number;
    maxDifficulty: number;
    feePerTx: number;
    transactions: Transaction[];
}