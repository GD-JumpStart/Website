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
        if (navigator.appVersion.toLowerCase().indexOf('mac') != -1) document.querySelectorAll('center div button')[0].innerText = 'Download for MacOS'
        else if (navigator.appVersion.toLowerCase().indexOf('win') != -1) document.querySelectorAll('center div button')[0].innerText = 'Download for Windows'
        else document.querySelectorAll('center div button')[0].innerHTML = 'Download for Windows <span class="popup"><i class="bi bi-exclamation-circle"></i><p class="content">OS not currently supported</p></span>'
        await new Promise(resolve => {
            fetch('https://api.github.com/repos/GD-JumpStart/Application/releases', {
                headers: {
                    'User-Agent': navigator.userAgent
                }
            }).then(res => { return res.json() }).then(res => {
                    let suffix = navigator.appVersion.toLowerCase().indexOf('mac') != -1 ? 'mac' : 'win'
                for (let i = 0; i < res.length; i++) {
                    if (res[i].tag_name.toLowerCase().endsWith(`-${suffix}`)) {
                        download = `https://github.com/GD-JumpStart/Application/releases/download/${res[i].tag_name}/${suffix == 'mac' ? 'JumpStart.zip' : 'JumpStart_Setup.exe'}`
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
    document.querySelectorAll('center div button')[0].onclick = () => location.href = download
    document.querySelectorAll('center div button')[1].onclick = () => location.href = `https://github.com/GD-JumpStart/`
    await wait(100)
    document.querySelector('center div').style.transform = 'translateY(0px)'
    document.querySelector('center div').style.opacity = '1'
    document.querySelector('nav').style.display = ''
    await wait(100)
    document.querySelector('nav').style.transform = 'translateX(0px)'
    document.querySelector('nav').style.opacity = '1'
})