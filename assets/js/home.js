const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
let download = ''

window.addEventListener('load', async () => {
    await wait(500)
    document.getElementById('icon').style.transform = 'translateY(50px)'
    document.getElementById('icon').style.opacity = '1'
    await wait(300)

    await new Promise(async resolve => {
        document.getElementById('load').style.opacity = '1'
        await wait(300)
        if (/windows/i.test(navigator.userAgent)) {
            var suffix = 'win'
            var dl = 'JumpStart_Setup.exe'
            document.querySelectorAll('center div a')[0].innerText = 'Download for Windows'
        } else if (/mac/i.test(navigator.userAgent)) {
            var suffix = 'mac'
            var dl = 'JumpStart.zip'
            document.querySelectorAll('center div a')[0].innerText = 'Download for MacOS'
        } else {
            var suffix = 'win'
            var dl = 'JumpStart_Setup.exe'
            document.querySelectorAll('center div a')[0].innerText = 'Download for Windows'

            let os = 'your OS'
            if (/linux/i.test(navigator.userAgent)) os = 'Linux'
            if (/iphone|ipad|ipod/i.test(navigator.userAgent)) os = 'iOS'
            if (/android/i.test(navigator.userAgent)) os = 'Android'
            document.querySelector('center #disclaimer').innerText = `Sorry, ${os} is not currently officially supported.`
        }
        await new Promise(resolve => {
            fetch('https://api.github.com/repos/GD-JumpStart/Application/releases', {
                headers: {
                    'User-Agent': navigator.userAgent
                }
            }).then(res => { return res.json() }).then(res => {
                for (let i = 0; i < res.length; i++) {
                        console.log(res[i].tag_name, `-${suffix}`)
                    if (res[i].tag_name.toLowerCase().endsWith(`-${suffix}`)) {
                        download = `https://github.com/GD-JumpStart/Application/releases/download/${res[i].tag_name}/${dl}`
                        break
                    }
                }
                resolve()
            })
        })
        document.onscroll = () => {
            if (document.body.scrollTop > window.innerHeight - 50) document.querySelector('nav').style.boxShadow = '3px 3px 15px 3px #0005'
            else document.querySelector('nav').style.boxShadow = ''
        }
        document.getElementById('load').style.opacity = '0'
        await wait(300)
        resolve()
    })
    document.getElementById('icon').style.transform = 'translateY(-10px) rotate(15deg)';
    await wait(500)
    document.querySelector('#content').style.display = ''

    document.querySelector('center h2').style.transform = 'translateY(0px)'
    document.querySelector('center h2').style.opacity = '1'
    await wait(100)
    document.querySelector('center p').style.transform = 'translateY(0px)'
    document.querySelector('center p').style.opacity = '1'
    document.querySelectorAll('center div a')[0].href = download
    document.querySelectorAll('center div a')[1].href = `https://github.com/GD-JumpStart/`
    await wait(100)
    document.querySelector('center div').style.transform = 'translateY(0px)'
    document.querySelector('center div').style.opacity = '1'
    document.querySelector('nav').style.display = ''
    await wait(100)
    document.querySelector('center #disclaimer').style.transform = 'translateY(0px)'
    if (document.querySelector('center #disclaimer').innerText != 'Space Waster') document.querySelector('center #disclaimer').style.opacity = '1'
    else {
        document.querySelector('center #disclaimer').style.pointerEvents = 'none'
        document.querySelector('center #disclaimer').style.userSelect = 'none'
    }
    document.querySelector('nav').style.transform = 'translateX(0px)'
    document.querySelector('nav').style.opacity = '1'
})
