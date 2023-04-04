const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const cookies = Cookies.withAttributes({ path: '', expires: 400, sameSite: 'lax' })
const query = new URLSearchParams(location.search)
JSON.searchify = (obj) => {
    let USP = new URLSearchParams
    Object.keys(obj).forEach(k => USP.set(k, obj[k]))
    return USP
}

window.addEventListener('load', async () => {
    await wait(300)

    await new Promise(async resolve => {
        document.getElementById('load').style.opacity = '1'
        await wait(300)
        document.onscroll = () => {
            if (document.body.scrollTop > window.innerHeight - 50) document.querySelector('nav').style.boxShadow = '3px 3px 15px 3px #0005'
            else document.querySelector('nav').style.boxShadow = ''
        }
        await new Promise(async resolve => {
            await new Promise(async resolve => {
                if (cookies.get('uid')) {
                    fetch('https://storage.kontroll.dev/jumpstart/auth', {
                        method: 'POST',
                        headers: {
                            'ID': cookies.get('uid')
                        }
                    }).then(res => { return res.json() }).then(res => {
                        if (!res.error) return location.href = '../'
                        cookies.remove('uid')
                        resolve()
                    })
                } else resolve()
            })

            if (!query.get('code')) return resolve()
            fetch('https://storage.kontroll.dev/jumpstart/auth', {
                method: 'POST',
                headers: {
                    'Code': query.get('code'),
                    'Redirect-URI': location.href.replace(location.search, '')
                }
            }).then(res => { return res.json() }).then(res => {
                if (res.error) return resolve()
                cookies.set('uid', res.id, { expires: new Date(res.expires) })
                cookies.set('auth', res.auth)
                location.href = '../'
            })
        })
        document.getElementById('load').style.opacity = '0'
        await wait(200)
        resolve()
    })
    
    document.querySelector('#login').style.display = ''
    await wait(100)
    document.querySelector('#login').style.transform = 'translateY(0px)'
    document.querySelector('#login').style.opacity = '1'
    
    document.querySelector('nav').style.display = ''
    await wait(100)
    document.querySelector('nav').style.transform = 'translateX(0px)'
    document.querySelector('nav').style.opacity = '1'
})