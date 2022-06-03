import "./MyAlert.css";

class MyAlert extends HTMLElement {
    constructor() {
        super();
    }

    set value(newValue) {
        this.innerText = newValue;
    }

    get value() {
        return this.innerText;
    }
}

export { MyAlert };
