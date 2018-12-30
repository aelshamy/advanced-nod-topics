const qs = require('querystring');

var incomingQS = [
    'foo=bar&foo=baz',
    'trademark=%E2%84%A2',
    '%7BLOTR%7D=frodo%20baggins'
];

incomingQS.forEach(item => {
    console.log(qs.parse(item));
});

const outgoingQS = {
    good: 'night',
    v: '0.10.28',
    hello: 'world with spaces'
}

console.log(qs.stringify(outgoingQS));

const newQS = qs.stringify(outgoingQS, '|', '~');

console.log(newQS);
console.log(qs.parse(newQS));