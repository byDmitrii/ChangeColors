const columns = document.querySelectorAll('.col')

document.addEventListener('keydown', e =>{
    e.preventDefault()
    if (e.code.toLowerCase() == 'space'){
        setRandomColors()
    }
})

document.addEventListener('click', e =>{
    const type = e.target.dataset.type
    if (type == 'lock') {
        const node = e.target.tagName.toLowerCase() == 'i' 
        ? e.target: e.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }else if(type == 'copy'){
        copyClick(e.target.textContent)
    }
})

function copyClick(text){
    return navigator.clipboard.writeText(text)
}

function genRandomColor() {
    const hex_code = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hex_code[Math.floor(Math.random() * hex_code.length)]
    }
    return '#' + color;
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    columns.forEach((col,index) => {
        const locks = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if(locks){
            colors.push(text.textContent)
            return
        }

    const color = isInitial 
    ? colors[index]
        ? colors[index]
        : genRandomColor()
    : genRandomColor()

    if(!isInitial){
        colors.push(color)
    }

    //or use chroma.random, but I write method (((
    text.textContent = color
    col.style.background = color
        
    setTextColor(text,color)
    setTextColor(button,color)
    })

    updateHash(colors)
}


function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black': 'aliceblue'
}

function updateHash(colors = []){
    document.location.hash = colors.map(color =>color.toString().toLowerCase().substring(1)).join('-')
}

function getColorsFromHash(){
    if (document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)