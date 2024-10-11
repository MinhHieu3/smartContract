import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { SmartContract } from '../wrappers/SmartContract';

// Hàm để chạy và tương tác với hợp đồng thông minh
export async function run(provider: NetworkProvider) {
    // Mở hợp đồng thông minh từ địa chỉ đã cho
    const smartContract = provider.open(
        SmartContract.fromAddress(Address.parse('EQCCzkZ42yr6MJIXUUU5dcL9OaeXX2CFv0wBenVPux5t_oZD')),
    );

    // Lấy giá trị counter trước khi gửi tin nhắn
    const counterBefore = await smartContract.getCounter();
    console.log('Counter before:', counterBefore);

    // Gửi tin nhắn Save để lưu trữ giá trị
    await smartContract.send(
        provider.sender(),
        {
            value: toNano('0.1'), // Giá trị gửi
        },
        {
            $$type: 'Save', // Loại tin nhắn
            amount: 1n, // Giá trị muốn lưu
        },
    );

    // Lấy giá trị counter sau khi gửi tin nhắn
    const counterAfter = await smartContract.getCounter();
    console.log('Counter after:', counterAfter);
}
