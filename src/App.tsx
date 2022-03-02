import React from "react";

import { TOKEN_LIST_URL } from "@jup-ag/core";
import { useJupiter } from "@jup-ag/react-hook";
import { PublicKey } from "@solana/web3.js";

const ENV = "mainnet-beta";
export interface Token {
  chainId: number; // 101,
  address: string; // 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  symbol: string; // 'USDC',
  name: string; // 'Wrapped USDC',
  decimals: number; // 6,
  logoURI: string; // 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW/logo.png',
  tags: string[]; // [ 'stablecoin' ]
}

export const App = () => {
  const [tokens, setTokens] = React.useState<Token[]>([]);
  const TokenAmount = 1 * 10 ** 6;
  const [inputMint] = React.useState<PublicKey>(
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  ); //USDT
  const [outputMint] = React.useState<PublicKey>(
    new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
  ); //USDC
  const jupiter = useJupiter({
    amount: TokenAmount, // raw input amount of tokens
    inputMint,
    outputMint,
    slippage: 1, // 1% slippage
    debounceTime: 250, // debounce ms time before refresh
  });

  React.useEffect(() => {
    // Fetch token list from Jupiter API
    fetch(TOKEN_LIST_URL[ENV])
      .then((response) => response.json())
      .then((result) => setTokens(result));
  }, []);

  return (
    <>
      <div style={{ fontWeight: 600, fontSize: 16, marginTop: 24 }}>
        Hook example
      </div>
      <div>Number of tokens: {tokens.length}</div>
      <div>Number of input tokens {jupiter.allTokenMints.length}</div>
      <div>Possible number of routes: {jupiter.routes?.length}</div>
      <div>Best quote: {jupiter.routes ? jupiter.routes[0].outAmount : ""}</div>
    </>
  );
};

export default App;
