import { Component, OnInit, Renderer2 } from '@angular/core';
import * as interact from 'interactjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private renderer2: Renderer2) { }

    ngOnInit() {
        const resizeObj = {
            //inertia: true,
            edges: { left: false, right: true, bottom: true, top: false },
            restrictSize: {
                min: { width: 300, height: 400 },
                max: { width: 700, height: 700 }
            }
        };
        const draggableObj = {
            ignoreFrom: '.content',
            inertia: true,
            restrict: {
                restriction: 'parent',
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: this.dragMoveListener,
            onend: function (event) {}
        }

        document.getElementById("special-one").style.webkitTransform =
        document.getElementById("special-one").style.transform = 'translate(500px, 300px)';

        document.getElementById("special-one").setAttribute('data-x', "500");
        document.getElementById("special-one").setAttribute('data-y', "300");

        interact('.draggable')
            .draggable(draggableObj)
            .resizable(resizeObj)
            .on('resizemove', function (event) {
                let target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                target.style.width = (<any>event).rect.width + 'px';
                target.style.height = (<any>event).rect.height + 'px';

                x += (<any>event).deltaRect.left;
                y += (<any>event).deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        );
        interact('.content').draggable({});
    }

    private dragMoveListener(event) {
        const target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the position attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
}