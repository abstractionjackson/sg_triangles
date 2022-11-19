// refactor the trig fns "sin", "cos" and "tan" to accept degrees
//

const toRadians = deg => deg * Math.PI / 180

const Trig = {
    sin: n => Math.sin(toRadians(n)),
    cos: n => Math.cos(toRadians(n)),
    tan: n => Math.tan(toRadians(n)),
}

const rotate = function(deg) {
    this.rotation = toRadians(deg)
}
