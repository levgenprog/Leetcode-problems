function solution(entryPoint) {
    const innerElements = entryPoint.querySelectorAll('*');

    let cpArr = [];
    let remArr = [];
    let remChildrenArr = [];
    let switchArr = [];

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
                case 'removeChildren':
                    remChildrenArr.push({
                        elem: el,
                        n: parseInt(cmd[1])
                    });
                    break;
                case 'switch':
                    switchArr.push({
                        elem: el,
                        n: parseInt(cmd[1])
                    });
                    break;
            }
        }
    }



    // for (let i = 0; i < 3; i++) {
    for (const obj of cpArr) {
        if (obj.elem.parentNode !== null) {
            if (!obj.elem.parentNode.hasAttribute('x-make')) {
                obj.elem.removeAttribute('x-make');
                for (let i = 0; i < obj.n; i++) {
                    let copy = obj.elem.cloneNode(true);
                    obj.elem.after(copy);
                }
            }
        }
    }


    for (const obj of remArr) {
        if (obj.elem.parentNode !== null) {
            if (!obj.elem.parentNode.hasAttribute('x-make')) {
                obj.elem.removeAttribute('x-make');
                for (let i = 0; i < obj.n; i++) {
                    let nextEl = obj.elem.nextElementSibling;
                    console.log(nextEl);
                    if (nextEl) {
                        nextEl.remove();
                    }
                }
            }
        }
    }

    for (const obj of remChildrenArr) {
        if (obj.elem.parentNode !== null) {
            if (!obj.elem.parentNode.hasAttribute('x-make')) {
                obj.elem.removeAttribute('x-make');
                const childrenArr = obj.elem.querySelectorAll('*');
                for (let i = 0; i < obj.n; i++) {
                    obj.elem.removeChild(childrenArr[i]);
                }
            }
        }
    }


    for (const obj of switchArr) {
        if (obj.elem.parentNode !== null) {
            if (!obj.elem.parentNode.hasAttribute('x-make')) {
                obj.elem.removeAttribute('x-make');
                obj.elem.parentNode.insertBefore(obj.elem, obj.elem.parentNode.childNodes[obj.n]);
            }
        }
    }
    // }




    // console.log(innerElements);
}

let a = Math.floor(Math.random() * 101)



// solution(document.querySelector('entry'));