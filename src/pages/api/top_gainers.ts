import type { NextApiRequest, NextApiResponse } from 'next';

const topGainersData = [
  {"change":"133.92%","name":"OKB","price":"107.00","symbol":"OKB","volume":"981,650,044"},
  {"change":"28.27%","name":"Fartcoin","price":"1.11","symbol":"FARTCOIN","volume":"679,238,298"},
  {"change":"23.41%","name":"Aerodrome Finance","price":"1.35","symbol":"AERO","volume":"215,979,495"},
  {"change":"18.40%","name":"Raydium","price":"3.60","symbol":"RAY","volume":"251,537,576"},
  {"change":"15.69%","name":"dogwifhat","price":"1.04","symbol":"WIF","volume":"477,560,993"},
  {"change":"14.99%","name":"Curve DAO Token","price":"1.05","symbol":"CRV","volume":"419,415,332"},
  {"change":"14.95%","name":"Solana","price":"201.26","symbol":"SOL","volume":"12,806,451,424"},
  {"change":"14.19%","name":"Sei","price":"0.343","symbol":"SEI","volume":"268,327,538"},
  {"change":"14.03%","name":"Pump.fun","price":"0.003996","symbol":"PUMP","volume":"502,169,757"},
  {"change":"13.52%","name":"Celestia","price":"1.95","symbol":"TIA","volume":"162,864,834"},
  {"change":"13.41%","name":"Kaspa","price":"0.0991","symbol":"KAS","volume":"114,990,914"},
  {"change":"13.32%","name":"Injective","price":"15.45","symbol":"INJ","volume":"180,861,101"},
  {"change":"13.13%","name":"Chainlink","price":"23.99","symbol":"LINK","volume":"2,888,202,200"},
  {"change":"13.04%","name":"Cardano","price":"0.875","symbol":"ADA","volume":"2,558,791,395"},
  {"change":"12.77%","name":"Render","price":"4.21","symbol":"RENDER","volume":"119,098,192"},
  {"change":"12.74%","name":"GateToken","price":"18.58","symbol":"GT","volume":"37,249,886"},
  {"change":"12.31%","name":"Bitget Token","price":"4.92","symbol":"BGB","volume":"430,580,736"},
  {"change":"11.94%","name":"Pyth Network","price":"0.1337","symbol":"PYTH","volume":"47,536,603"},
  {"change":"11.87%","name":"JasmyCoin","price":"0.01839","symbol":"JASMY","volume":"126,452,360"},
  {"change":"11.87%","name":"Jupiter","price":"0.5536","symbol":"JUP","volume":"117,914,069"},
  {"change":"11.45%","name":"NEAR Protocol","price":"2.89","symbol":"NEAR","volume":"373,906,179"},
  {"change":"11.41%","name":"Bonk","price":"0.00002693","symbol":"BONK","volume":"730,615,302"},
  {"change":"11.36%","name":"Worldcoin","price":"1.09","symbol":"WLD","volume":"276,692,069"},
  {"change":"11.29%","name":"Uniswap","price":"12.12","symbol":"UNI","volume":"1,137,980,843"},
  {"change":"11.28%","name":"Arbitrum","price":"0.4902","symbol":"ARB","volume":"667,134,160"},
  {"change":"11.18%","name":"Dogecoin","price":"0.2462","symbol":"DOGE","volume":"4,146,281,564"},
  {"change":"11.00%","name":"Aave","price":"327.36","symbol":"AAVE","volume":"786,407,376"},
  {"change":"10.90%","name":"Sui","price":"4.04","symbol":"SUI","volume":"2,194,675,468"},
  {"change":"10.84%","name":"The Graph","price":"0.1034","symbol":"GRT","volume":"65,895,289"},
  {"change":"10.79%","name":"Vaulta","price":"0.5847","symbol":"A","volume":"90,028,281"}
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(topGainersData);
}
