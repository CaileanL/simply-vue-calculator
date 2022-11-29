new Vue({
    el: "#li_calc",
    data: {
        param1: 0,
        param2: 0,
        isParam1: true,
        option: "",
        addPoint: false,
    },
    methods: {
        common() {
            this.isParam1 = false;
            this.param2 = 0;
        },
        plus() {
            this.option = "+";
            this.common();
        },
        minus() {
            this.option = "-";
            this.common();
        },
        mul() {
            this.option = "*";
            this.common();
        },
        div() {
            this.option = "/";
            this.common();
        },
        point() {
            this.addPoint = true;
            if (this.isParam1) this.param1 += ".";
            else this.param2 += ".";
        },
        number(num) {
            if (this.isParam1) {
                this.param1 = this.param1.toString();
                this.param1 += num;
                // console.log(this.param1.indexOf("0"));
                if (this.param1.indexOf("0") == 0 && this.param1.length == 2)
                    this.param1 = this.param1.slice(1, this.param1.length);
            } else {
                this.param2 = this.param2.toString();
                this.param2 += num;
                if (this.param2.indexOf("0") == 0 && this.param2.length == 2)
                    this.param2 = this.param2.slice(1, this.param2.length);
            }
        },
        equal() {
            console.log(this.param1, this.param2);
            //让字符串变回数字
            this.param1 = parseFloat(this.param1);
            this.param2 = parseFloat(this.param2);
            //解决计算后的精度丢失：0.3+0.2
            var maxAfterPoint =
                this.afterPoint(this.param1) > this.afterPoint(this.param2)
                    ? this.afterPoint(this.param1)
                    : this.afterPoint(this.param2);
            switch (this.option) {
                case "+":
                    this.param1 = this.param1 + this.param2;
                    this.param1 = parseFloat(this.param1.toFixed(maxAfterPoint));
                    break;
                case "-":
                    this.param1 = this.param1 - this.param2;
                    this.param1 = parseFloat(this.param1.toFixed(maxAfterPoint));
                    break;
                case "*":
                    this.param1 = this.param1 * this.param2;
                    break;
                case "/":
                    this.param1 = this.param1 / this.param2;
                    break;
            }
            this.isParam1 = true;
        },
        re() {
            if (this.isParam1) this.param1 = -this.param1;
            else this.param2 = -this.param2;
        },
        clean() {
            if (this.isParam1) this.param1 = 0;
            else this.param2 = 0;
        },
        cleanAll() {
            this.param1 = 0;
            this.param2 = 0;
            this.isParam1 = true;
            this.option = "";
        },
        del() {
            if (this.isParam1) {
                this.param1 = this.param1.toString();
                this.param1 = this.param1.slice(0, this.param1.length - 1);
                // console.log(this.param1.indexOf("."));
                // console.log(this.param1.length);
                if (
                    this.param1.indexOf(".") == this.param1.length - 1 &&
                    this.param1 > 0
                ) {
                    this.del();
                } else if (this.param1 == "") this.param1 = 0;
            } else {
                this.param2 = this.param2.toString();
                this.param2 = this.param2.slice(0, this.param2.length - 1);
                if (
                    this.param2.indexOf(".") == this.param2.length - 1 &&
                    this.param1 > 0
                ) {
                    this.del();
                } else if (this.param2 == "") this.param2 = 0;
            }
        }, extraOpreation(opreation) {
            this.param1 = parseFloat(this.param1);
            this.param2 = parseFloat(this.param2);
            switch (opreation) {
                case "square":
                    this.square();
                    break;
                case "reciprocal":
                    this.reciprocal();
                    break;
                case "squareRoot":
                    this.squareRoot();
                    break;
            }
        },
        square() {
            if (this.isParam1) {
                this.param1 = this.param1 * this.param1;
            } else {
                this.param2 = this.param2 * this.param2;
            }
        },
        reciprocal() {
            if (this.isParam1) {
                this.param1 = 1 / this.param1;
            } else {
                this.param2 = 1 / this.param2;
            }
        },
        squareRoot() {
            if (this.isParam1) {
                this.param1 = Math.sqrt(this.param1);
            } else {
                this.param2 = Math.sqrt(this.param2);
            }
        },
        div100() {
            if (this.isParam1) this.param1 /= 100;
            else this.param2 /= 100;
        },
        afterPoint(num) {
            var x = String(num).indexOf(".") + 1; //小数点的位置
            var y = String(num).length - x; //小数的位数
            return y;
        },
    },
});