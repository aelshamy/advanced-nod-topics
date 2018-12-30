const dns = require('dns');
const arg = process.argv.slice(2);
const domain = arg[0];

dns.resolve(domain, (err, addresses) => {
    if (err) {
        console.log(err);
    }
    addresses.forEach((ipaddress) => {
        getDomainReverse('resolve', ipaddress);
    });
});

dns.lookup(domain, (err, ipaddress, family) => {
    if (err) {
        console.log(err);
    }

    getDomainReverse('lookup', ipaddress);
});

function getDomainReverse(type, ipaddress) {
    dns.reverse(ipaddress, (err, hostname) => {
        if (err) {
            console.log(err);
        }

        console.log(`${type} domain name for ${ipaddress} ${hostname}`)
    });
}