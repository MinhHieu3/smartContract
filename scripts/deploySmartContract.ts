import { toNano } from '@ton/core';
import { SmartContract } from '../wrappers/SmartContract';
import { NetworkProvider } from '@ton/blueprint';

// Hàm chạy để triển khai hợp đồng
export async function run(provider: NetworkProvider) {
    // Sử dụng Math.random() để tạo số ngẫu nhiên
    const randomInt = BigInt(Math.floor(Math.random() * 1000000)); // Chú ý chỉnh sửa từ 'ramdom' thành 'random'

    // Khởi tạo smartContract với một id ngẫu nhiên
    const smartContract = provider.open(await SmartContract.fromInit(randomInt));

    // Gửi tin nhắn Deploy để triển khai hợp đồng
    await smartContract.send(
        provider.sender(),
        {
            value: toNano('0.01'), // Giá trị gửi đi
        },
        {
            $$type: 'Deploy', // Loại tin nhắn
            queryId: 0n, // Id truy vấn
        },
    );

    // Đợi cho đến khi hợp đồng được triển khai
    await provider.waitForDeploy(smartContract.address);

    // Chạy các phương thức trên smartContract nếu cần
    // Ví dụ:
    const counterBefore = await smartContract.getCounter();
    console.log('Counter before:', counterBefore);
}
