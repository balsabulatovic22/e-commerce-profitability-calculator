const assert=require('node:assert/strict');const {calculate,defaults}=require('./calc.js');const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
let x={...defaults,price:20,cost:5,shipping:2,packaging:1,fee:0,fixedFee:0,orders:100,returns:0,returnCost:0,loss:0,ads:400,overhead:100,vat:0};let y=calculate(x);close(y.profit,700);close(y.breakRoas,2000/1100);close(y.maxCpa,11);close(calculate({...x,ads:y.adCapacity}).profit,0);
y=calculate({...x,returns:10,returnCost:2});close(y.kept,90);close(y.goods,450);close(y.delivery,220);close(y.profit,530);
y=calculate({...x,returns:10,returnCost:2,loss:100});close(y.goods,500);close(y.profit,480);
y=calculate({...x,price:24,vat:20});close(y.revenue,2000);close(y.tax,400);close(y.profit,700);
y=calculate({...x,returns:100});close(y.gross,0);assert.equal(y.breakRoas,null);assert.equal(y.cpa,null);
y=calculate({...x,orders:0});close(y.profit,-500);assert.equal(y.maxCpa,null);assert.equal(y.margin,null);
y=calculate({...x,ads:0});assert.equal(y.roas,null);close(y.cpa,0);
y=calculate({...x,cost:30});assert.equal(y.breakRoas,null);assert.equal(y.maxCpa,null);
y=calculate({...x,price:20,fee:5,fixedFee:1});close(y.fees,200);close(y.profit,500);
assert.throws(()=>calculate({...x,orders:1.5}));assert.throws(()=>calculate({...x,returns:101}));assert.throws(()=>calculate({...x,price:NaN}));assert.throws(()=>calculate({...x,cost:-1}));
console.log('Passed: baseline, break-even identity, returns, lost stock, VAT, full returns, zero volume, zero ads, negative economics, fees and input validation.');

for (const extra of [{},{returns:20,loss:50,returnCost:3,fee:2,fixedFee:.3,vat:21,overhead:150},{price:5,ads:1000}]) {const inp={...defaults,...extra};const out=calculate(inp);close(calculate({...inp,price:out.breakPrice}).profit,0);close(out.revenue-out.totalCosts,out.profit);}
assert.equal(calculate({...defaults,fee:100}).breakPrice,null);assert.equal(calculate({...defaults,returns:100}).breakPrice,null);
console.log('Passed: break-even price with VAT, fees, returns and overhead; cost reconciliation; undefined break-even price.');
