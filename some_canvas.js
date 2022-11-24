const { sin, cos, tan } = Trig
const Point = (x, y) => ({ x, y })
const CANVAS = {
    WIDTH: 420,
    HEIGHT: 420
}
const TSN = {
    ROTATION: 0,
    SCALE: Point(1, 1),
    BASE: CANVAS.WIDTH / 10,
    HEIGHT: tan(30) * (CANVAS.WIDTH / 10),
    COLOR: 'black',
    ORIGIN: Point(0, 0),
    CTX: null,
    draw: function() {
        const { CTX, COLOR, ORIGIN, ROTATION, SCALE, BASE, HEIGHT} = this
        CTX.fillStyle = COLOR
        CTX.translate(ORIGIN.x, ORIGIN.y)
        CTX.rotate(ROTATION * Math.PI / 180)
        CTX.scale(SCALE.x, SCALE.y)
        CTX.beginPath()
        CTX.moveTo(0, 0)
        CTX.lineTo(- BASE, 0)
        CTX.lineTo(0, - HEIGHT)
        CTX.closePath()
        CTX.fill()
        //reset rotation
        CTX.setTransform(1, 0, 0, 1, 0, 0);
    }
}
const ISO = {
    COLOR: 'black',
    ORIGIN: Point(0, 0),
    ROTATION: 0,
    SCALE: Point(1, 1),
    CTX: null,
    draw: function() {
        const { SCALE } = this
        const { draw } = TSN
        const tsnL = {
            ...TSN,
            ...this,
            draw
        }
        const tsnR = {
            ...TSN,
            ...this,
            draw,
            SCALE: Point(-SCALE.x, SCALE.y),
        }
        tsnL.draw()
        tsnR.draw()
    }
}
const EQL = {
    COLOR: Array(3).fill('black'),
    ORIGIN: Point(0, 0),
    ROTATION: 0,
    SCALE: Point(1, 1),
    OFFSET_X: cos(60) * TSN.BASE,
    OFFSET_Y: sin(60) * TSN.BASE,
    draw: function() {
        const { COLOR, ORIGIN, OFFSET_X, OFFSET_Y, CTX , ROTATION} = this
        const { draw } = ISO
        const isoB = {
            ...ISO,
            ...this,
            draw,
            COLOR: COLOR[1],
        }
        const isoL = {
            ...ISO,
            ...this,
            draw,
            ROTATION: 120,
            ORIGIN: Point(-OFFSET_X, -OFFSET_Y),
            COLOR: COLOR[2],
        }
        const isoR = {
            ...ISO,
            ...this,
            draw,
            ROTATION: -120,
            ORIGIN: Point(+OFFSET_X, -OFFSET_Y),
            COLOR: COLOR[0],
        }
        isoB.draw()
        isoL.draw()
        isoR.draw()
    }
}
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = CANVAS.WIDTH
canvas.height = canvas.width
canvas.style = "border: 2px solid black; background: white; margin: 1rem 8rem"

const CTX = canvas.getContext('2d')

// Scriot
CTX.lineWidth = 2

const someEQL = {
    ...EQL, CTX, ORIGIN: Point(300, 300),
    COLOR: ['red', 'blue', 'white']
}
console.log(someEQL)
someEQL.draw()
const anotherEQL = {
    ...someEQL,
    ROTATION: 18,
    ORIGIN: Point(130, CANVAS.HEIGHT-212),
    SCALE: Point(1, -1)
}
anotherEQL.draw()