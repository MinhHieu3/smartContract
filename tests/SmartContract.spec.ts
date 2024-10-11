import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SmartContract } from '../wrappers/SmartContract';
import '@ton/test-utils';

describe('SmartContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let smartContract: SandboxContract<SmartContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        smartContract = blockchain.openContract(await SmartContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await smartContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: smartContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and smartContract are ready to use
    });
});
