const net = require('net');
const fs = require('fs');
const fileStream = fs.createReadStream('data.txt');
const readLine = require('readline');

client = new net.Socket();
client.connect({
    port: 59090
});

client.on('connect', () => {
    setInterval(sendData, 1000);
});

client.on('error', (err) => {
    console.log('Error: ', err);
})

client.setEncoding('utf8');

// provides random number between minimum and max
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// reads data from file //client.write(line);
const sendData = () => {
    //fs.createReadStream('data.txt', 'utf8', (err, contents) => {
    
    const lineReader = readLine.createInterface({
        input: fileStream,
        console: true,
        crlfDelay: Infinity
    });

    lineReader.on('line', (data) => {
        fileStream.pause(10000);
        client.write(data);
        fileStream.resume();
    });
    
    lineReader.on('close', () => {
        console.log('End');
        fileStream.close();
    });
}

// writes data to the file
const writeDataToFile = () => {
    fs.appendFile('data.txt', 'The quick brown fox jumps over the lazy dog. ' + Date.now() + '\r\n', (err) => {
        if(err){
            throw err;
        }
    });
}

// supposed sensor that write to a file in random interval between 0 - 1000
try {
    const random = randomNumber(0, 1000);
    console.log(random);
    setInterval(writeDataToFile, random);
}catch(e) {
    throw e;
}