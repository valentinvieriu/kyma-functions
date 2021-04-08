const fetch = require('node-fetch');

module.exports = { 
  main: async function (event, context) {
    const cloudEvent = {
    'ce-type': event['ce-type'] || '',
    'ce-source': event['ce-source'],
    'ce-eventtypeversion': event['ce-eventtypeversion'] || '',
    'ce-specversion': event['ce-specversion'] || '',
    'ce-id': event['ce-id'] || '',
    'ce-time': event['ce-time'] || ''
    };
    const traceHeaders = {
    'x-request-id': event.extensions.request.headers['x-request-id'] || '',
    'x-b3-traceid': event.extensions.request.headers['x-b3-traceid'] || '',
    'x-b3-spanid': event.extensions.request.headers['x-b3-spanid'] || '',
    'x-b3-parentspanid': event.extensions.request.headers['x-b3-parentspanid'] || '',
    'x-b3-sampled': event.extensions.request.headers['x-b3-sampled'] || '',
    'x-b3-Flags': event.extensions.request.headers['x-b3-Flags'] || '',
    'x-ot-span-context': event.extensions.request.headers['x-ot-span-context'] || ''
    };
    console.log(`cloudEvent: ${JSON.stringify(cloudEvent)}`);
    console.log(`traceHeaders: ${JSON.stringify(traceHeaders)}`);
    console.log(`Event data: ${JSON.stringify(event.data)}`);
    if(event.data.orderCode) {
      let orderUrl = `${process.env.GATEWAY_URL}/test/orders/${encodeURIComponent(event.data.orderCode)}`
      const response =  await fetch(orderUrl).then(res => res.json());
      console.log(`Feched data GATEWAY_URL: ${JSON.stringify(response)}`);
      return response;
    } else {
      const url = process.env['GATEWAY_URL']+event.extensions.request.originalUrl;
      console.log(`Feched url: ${url}`);
      return await fetch(url).then(res => res.json())
    }

  }
}
