(function(root){
 const defaults={price:25,cost:6,shipping:3,packaging:0,fee:0,fixedFee:0,orders:100,returns:0,returnCost:0,loss:0,ads:500,overhead:0,vat:0};
 function calculate(x){
  for(const k of Object.keys(defaults)) if(!Number.isFinite(x[k])||x[k]<0) throw Error('Enter a non-negative number in every field.');
  if(x.returns>100||x.loss>100||x.fee>100||x.vat>100)throw Error('Percentages must be between 0 and 100.');
  if(!Number.isInteger(x.orders))throw Error('Orders shipped must be a whole number.');
  const rate=x.returns/100, kept=x.orders*(1-rate), failed=x.orders-kept;
  const gross=kept*x.price, revenue=gross/(1+x.vat/100), tax=gross-revenue;
  const goods=kept*x.cost+failed*x.cost*x.loss/100;
  const delivery=x.orders*x.shipping+failed*x.returnCost, packaging=x.orders*x.packaging;
  const fees=kept*(x.price*x.fee/100+x.fixedFee);
  const contribution=revenue-goods-delivery-packaging-fees;
  const adCapacity=contribution-x.overhead;
  const rawProfit=adCapacity-x.ads, profit=Math.abs(rawProfit)<1e-8?0:rawProfit, margin=revenue>0?profit/revenue:null;
  const totalCosts=goods+delivery+packaging+fees+x.ads+x.overhead;
  const priceFactor=kept*(1/(1+x.vat/100)-x.fee/100);
  const nonPriceCosts=goods+delivery+packaging+kept*x.fixedFee+x.ads+x.overhead;
  const breakPrice=priceFactor>0?nonPriceCosts/priceFactor:null;
  return {breakPrice,totalCosts,kept,failed,gross,revenue,tax,goods,delivery,packaging,fees,contribution,adCapacity,profit,margin,roas:x.ads>0?gross/x.ads:null,cpa:kept>0?x.ads/kept:null,maxCpa:kept>0&&adCapacity>0?adCapacity/kept:null,breakRoas:adCapacity>0&&gross>0?gross/adCapacity:null,perOrder:kept>0?profit/kept:null};
 }
 if(typeof module!=='undefined')module.exports={calculate,defaults}; else root.ProfitabilityMath={calculate,defaults};
})(typeof window!=='undefined'?window:globalThis);
