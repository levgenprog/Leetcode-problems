function solution(entryPoint) {
    const innerElements = entryPoint.querySelectorAll('*');
    //array of objects
    let cpArr = [];
    let remArr = [];

    for (const el of innerElements) {
        let command = el.getAttribute('x-make');
        if (command) {
            let cmd = command.split(':');
            switch (cmd[0]) {
                case 'copy':
                    cpArr.push({
                        elem: el,
                        n: parseInt(cmd[1])
                    });
                    console.log(cpArr);
                    break;
                case 'remove':
                    remArr.push({
                        elem: el,
                        n: parseInt(cmd[1])
                    });
                    console.log(remArr);
                    break;
            }
        }
    }

    for (const obj of cpArr) {
        for (let i = 0; i < obj.n; i++) {
            obj.elem.removeAttribute('x-make');
            let copy = obj.elem.cloneNode(true);
            obj.elem.after(copy);
        }
    }

    for (const obj of remArr) {
        obj.elem.removeAttribute('x-make');
        for (let i = 0; i < obj.n; i++) {
            let nextEl = obj.elem.nextElementSibling;
            console.log(nextEl);
            if (nextEl) {
                nextEl.remove();
            }
        }
    }

    // console.log(innerElements);
}

solution(document.querySelector('entry'));