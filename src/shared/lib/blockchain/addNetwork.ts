export const addHoleskyNetwork = () => {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x4268',
              rpcUrls: ['https://ethereum-holesky-rpc.publicnode.com	'],
              chainName: 'Holesky',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://holesky.etherscan.io/'],
            },
          ],
        })
}