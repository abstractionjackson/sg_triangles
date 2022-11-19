
const { sin, cos, tan } = Trig

const CANVAS_WIDTH = CANVAS_HEIGHT= 640
const COLOR = {
    RED: 0xff0000,
    WHITE: 0xffffff,
    BLUE: 0x0000ff,
    Y: 0xffff00,
    A: 0x00ffff,
}

let app = new PIXI.Application({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, backgroundColor: 0xffffff });

const canvas = app.stage
document.body.appendChild(app.view);

// Triangle
// 30-60-90 Right
const BASE = 0.1 * CANVAS_WIDTH
, ANGLE_A = 90
, ANGLE_B = 30
, ANGLE_C = 60
, HEIGHT = tan(ANGLE_B) * BASE

// Isoceles
const getICT =(color=0x000) => {
    const cont = new PIXI.Container()
    cont.pivot.set(BASE, HEIGHT)
    const tsnl = new PIXI.Graphics()
    .beginFill(color)
    .drawShape(new PIXI.Polygon(
        [
            BASE, HEIGHT,
            0, HEIGHT,
            BASE, 0
        ]
    ))
    .endFill()
    const tsnr = tsnl.clone()
        .setTransform(2 * BASE, 0, -1)
    cont.addChild(tsnl, tsnr)
    return cont
}
// Equilateral
// input: colors c, l, r
const EQT_HEIGHT = HEIGHT + BASE/cos(30)
const getEQT = (colors) => {
    const OFFSET_X = cos(60) * BASE
    , OFFSET_Y = sin(60) * BASE
    const etc = new PIXI.Container()
    const itc = getICT(colors[0])
    const itl = getICT(colors[1])
    itl.position.set(
        -OFFSET_X,
        -OFFSET_Y
    )
    rotate.call(itl, 120)

    etc.addChild(itc, itl)
    return etc
}
// Script
const origin = {
    x: 0,
    y: CANVAS_HEIGHT
}
console.log("Start")
while (origin.y > 0) {
    //do stuff
    while (origin.x <= CANVAS_WIDTH) {
        //do stuff
        console.log("Adding EQT")
        const eqt = getEQT([COLOR.RED, COLOR.BLUE])
        eqt.position.set(origin.x, origin.y)
        const uet = getEQT([COLOR.Y, COLOR.A])
        uet.scale.y = -1
        uet.position.x = origin.x + BASE
        uet.position.y = origin.y - EQT_HEIGHT
        canvas.addChild(eqt, uet)
        origin.x += 2 * BASE
    }
    origin.x = 0
    origin.y -= EQT_HEIGHT
}
// Sanity check

// place a blue dot at the canvas center

const canvas_center = new PIXI.Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)

//canvas.addChild(new PIXI.Graphics()
//    .beginFill(COLOR.BLUE)
//    .drawShape(new PIXI.Circle(canvas_center.x, canvas_center.y, 10))
//    .endFill());
//
//// place a red cross in the upper left
const CROSS_W = 68
const CROSS_H = 102
const CROSS_X = CROSS_Y = 34
const cross_container = new PIXI.Container()
const red_cross = new PIXI.Graphics()
.beginFill()
.lineStyle(2, COLOR.RED)
.moveTo(CROSS_W / 2, 0)
.lineTo(CROSS_W / 2, CROSS_H)
.moveTo(0, CROSS_Y)
.lineTo(CROSS_W, CROSS_Y)
.endFill()

//cross_container.addChild(red_cross)
cross_container.setTransform(CROSS_X, CROSS_Y)
canvas.addChild(cross_container)
red_cross.pivot.set(CROSS_X, CROSS_Y)
rotate.call(red_cross, -90)
