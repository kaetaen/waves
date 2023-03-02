/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const ipcRenderer  = require('electron').ipcRenderer


window.onload = () => {
    const mainBtn = document.querySelector('.btn_ripple')

    mainBtn.onclick = () => {
        const btnStatus = mainBtn.children[0].innerHTML

        if (btnStatus == 'Disabled') {
            mainBtn.children[0].innerHTML = 'Enabled'
            mainBtn.style.animation = 'ripple 1.5s infinite running'
            mainBtn.style.backgroundColor = '#50fa7b'
            ipcRenderer.invoke('enable-pulseaudio').then((result) => {
                console.log('Pulseaudio started!')
            })
        
        } else if (btnStatus == 'Enabled') {
            mainBtn.children[0].innerHTML = 'Disabled'
            mainBtn.style.animation = 'none'
            mainBtn.style.backgroundColor = '#282a36'
            ipcRenderer.invoke('disable-pulseaudio').then((result) => {
              console.log('Pulseaudio is finish!')
            })
        }
    }
}
