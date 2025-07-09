import { describe, test, expect, beforeAll } from '@jest/globals';
import TransactionInput from '../src/lib/transactionInput';
import Wallet from '../src/lib/wallet';
import TransactionOutput from '../src/lib/transactionOutput';

describe("Transaction Input tests", () => {

    let alice: Wallet, bob: Wallet;
    const exampleTx: string = "148c5aa2dcc6d1898dd133993b0ed0db55476f2e2fbeef2e3de6ff252df83f87";

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    })

    test('Should be valid', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: "abc"
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeTruthy();
    })

    test('Should NOT be valid (defaults)', () => {
        const txInput = new TransactionInput();
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (empty signature)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid amount)', () => {
        const txInput = new TransactionInput({
            amount: -10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid signature)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        txInput.sign(bob.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid previous Tx)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should create from TXO', () => {
        const txi = TransactionInput.fromTxo({
            amount: 10,
            toAddress: alice.publicKey,
            tx: exampleTx
        } as TransactionOutput)
        txi.sign(alice.privateKey);

        txi.amount = 11;
        const result = txi.isValid();
        expect(result.success).toBeFalsy();
    })
})