class Color {
    constructor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    toString() {
        return `hsl(${this.h % 360}, ${this.s}%, ${this.l}%)`;
    }
}

export { Color };
