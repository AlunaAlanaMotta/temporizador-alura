const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const startPauseIcon = document.querySelector('#start-pause-icon')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const play = new Audio('./sons/play.wav')
const pause = new Audio('./sons/pause.mp3')
const beep = new Audio('./sons/beep.mp3') 

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

const playIconPath = './imagens/play_arrow.png';
const pauseIconPath = './imagens/pause.png';

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alternadoContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300 // 5x 60 = 300 ou seja, 5 minutos!
    alternadoContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900 // 15x 60 = 900 ou seja, 15 minutos!
    alternadoContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alternadoContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
      switch (contexto) {
        case "foco":

            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
          
          break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`

          break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa!</strong>`

          break;
        default:
          break;
      }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <=0) {
        beep.play()
        alert('Temporizador finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    startPauseIcon.setAttribute('src', pauseIconPath)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
    startPauseIcon.setAttribute('src', playIconPath)
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()