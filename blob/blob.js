class Blob {
    constructor () {
        console.info('Init blob');

        this.el         = document.querySelector('.js-canvas');
        this.radius     = 200;
        this.rotation   = 0;

        this.initContext();
        this.setStyle();
        this.setupLoop();

        console.info('Settings', this);
    }

    initContext () {
        this.ctx = this.el.getContext('2d');
        this.centerX = parseInt(this.el.width / 2);
        this.centerY = parseInt(this.el.height / 2);
    }

    setStyle () {
        this.ctx.strokeStyle = '#ff0000';
    }

    drawPerfectCircle () {
        console.info('Update circle');

        this.bezierDistance = (this.radius * 4 * (Math.sqrt(2) - 1) / 3);
        this.rotation++;

        // this.ctx.rotate(this.rotation * Math.PI / 180);

        this.drawTopLeft();
        this.drawTopRight();
        this.drawBottomRight();
        this.drawBottomLeft();
    }

    //d=r*4*(sqrt(2)-1)/3

    drawTopLeft () {
        let startX = this.centerX - this.radius,
            startY = this.centerY,
            startBezierX = startX,
            startBezierY = startY - this.bezierDistance - this.bezierStrength,
            endX = this.centerX,
            endY = this.centerY - this.radius,
            endBezierX = endX - this.bezierDistance - this.bezierStrength,
            endBezierY = endY;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(startBezierX, startBezierY, endBezierX, endBezierY, endX, endY);
        this.ctx.stroke();
    }

    drawTopRight () {
        let startX = this.centerX,
            startY = this.centerY - this.radius,
            startBezierX = startX + this.bezierDistance,
            startBezierY = startY,
            endX = this.centerX + this.radius,
            endY = this.centerY,
            endBezierX = endX,
            endBezierY = endY - this.bezierDistance;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(startBezierX, startBezierY, endBezierX, endBezierY, endX, endY);
        this.ctx.stroke();
    }

    drawBottomRight () {
        let startX = this.centerX + this.radius,
            startY = this.centerY,
            startBezierX = startX,
            startBezierY = startY + this.bezierDistance,
            endX = this.centerX,
            endY = this.centerY + this.radius,
            endBezierX = endX + this.bezierDistance,
            endBezierY = endY;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(startBezierX, startBezierY, endBezierX, endBezierY, endX, endY);
        this.ctx.stroke();
    }

    drawBottomLeft () {
        let startX = this.centerX,
            startY = this.centerY + this.radius,
            startBezierX = startX - this.bezierDistance,
            startBezierY = startY,
            endX = this.centerX - this.radius,
            endY = this.centerY,
            endBezierX = endX,
            endBezierY = endY + this.bezierDistance;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.bezierCurveTo(startBezierX, startBezierY, endBezierX, endBezierY, endX, endY);
        this.ctx.stroke();
    }

    updateBezierStrength () {
        this.bezierStrength = parseInt(document.querySelector('.js-bezier-strength').value);
    }

    clearCanvas () {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    }

    updateCanvas () {
        this.updateBezierStrength();
        this.clearCanvas();
        this.drawPerfectCircle();

        window.requestAnimationFrame(this.updateCanvas.bind(this));
    }

    setupLoop () {
        window.requestAnimationFrame(this.updateCanvas.bind(this));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Blob();
});