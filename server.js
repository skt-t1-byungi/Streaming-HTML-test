import { createServer } from 'http'

const sleep = ms => new Promise(r => setTimeout(r, ms))

createServer(async (_, resp) => {
    resp.write(`
<!DOCTYPE html>
<html>
<head>
    <title>Streaming HTML test</title>
</head>
<body>
    first
`)

    for (let i = 0; i < 10; i++) {
        resp.write(`
        <button id="btn${i}">cli`)
        await sleep(1000)

        resp.write(`ck!</button>
        <script>
        el = document.getEleme`)
        await sleep(1000)

        resp.write(`ntById('btn${i}'); 
        el.textContent += '(event bounded)'
        el.addEventListener('click', () => alert("${i} clicked!"))`)
        await sleep(1000)

        resp.write(`
        </script>        
        <style>
            :root{ background: `)
        await sleep(1000)

        resp.write(`${['pink', 'yellow', 'azure'][i % 3]} }
        </style>
        `)
        await sleep(1000)
    }

    resp.write(`
    last
</body>
</html>
`)
    resp.end()
}).listen(80, () => console.log('start!'))
