// interface Block {
//     id: number;
//     form: number[][];
// }

// interface LayoutResult {
//     blockId: number;
//     position: number;
//     isRotated: boolean;
// }

const blocks = [{
    "id": 4892,
    "form": [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
},
{
    "id": 1839,
    "form": [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 0]
    ]
},
{
    "id": 8183,
    "form": [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
        [0, 1, 0]
    ]
}];

function layout(blocks) {


    function canPlaceBlockAtPosition(
        block,
        grid,
        row,
        col
    ) {
        // Получаем размеры блока
        const blockRows = block.form.length;
        const blockCols = block.form[0].length;

        // Проверяем, не выходит ли блок за границы сетки
        if (row + blockRows > grid.length || col + blockCols > grid[0].length) {
            return false;
        }

        // Проверяем, не пересекает ли блок другие блоки на сетке
        for (let i = row; i < row + blockRows; i++) {
            for (let j = col; j < col + blockCols; j++) {
                if (grid[i][j] !== 0) {
                    return false;
                }
            }
        }

        // Если все проверки пройдены успешно, то блок может быть размещен на этой позиции сетки
        return true;
    }

    function placeBlockAtPosition(block, grid, row, col) {
        // Получаем размеры блока
        const numRows = block.form.length;
        const numCols = block.form[0].length;

        // Заполняем ячейки сетки, соответствующие позиции блока, значениями его id
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (block.form[r][c] === 1) {
                    grid[row + r][col + c] = block.id;
                }
            }
        }
    }

    function rotateBlock(block) {
        const numRows = block.length;
        const numCols = block[0].length;
        const rotatedBlock = [];

        // Create a new 2D array to hold the rotated block
        for (let i = 0; i < numCols; i++) {
            rotatedBlock.push(new Array(numRows).fill(0));
        }

        // Rotate the block by 90 degrees
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                rotatedBlock[j][numRows - 1 - i] = block[i][j];
            }
        }

        return rotatedBlock;
    }



    // Сначала определяем ширину сетки, как максимальную ширину блока
    const width = Math.max(...blocks.map(block => block.form[0].length));

    // Создаем пустую сетку, заполненную нулями
    let length = blocks.length;
    const grid = Array.from({ length }, () =>
        Array(width).fill(0)
    );

    // Массив для хранения информации о размещении блоков
    const layoutResults = [];
    let lastPos = 0;
    // Перебираем все блоки
    for (const block of blocks) {
        let isRotated = false;
        let placed = false;


        // Перебираем все позиции на сетке, пока не найдем подходящую
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < width; col++) {
                if (canPlaceBlockAtPosition(block, grid, row, col)) {
                    // Размещаем блок на сетке
                    placeBlockAtPosition(block, grid, row, col);
                    // Добавляем информацию о размещении блока
                    layoutResults.push({
                        blockId: block.id,
                        position: row * width + col + 1,
                        isRotated
                    });
                    lastPos = row * width + col + 1;
                    placed = true;
                    // Прерываем цикл поиска позиции, так как блок уже размещен
                    break;
                } else {
                    // Если блок не помещается в текущей позиции, поворачиваем его и пытаемся разместить еще раз
                    block.form = rotateBlock(block.form);
                    isRotated = !isRotated;
                }
            }

            if (placed) {
                break;
            }
        }


        if (!layoutResults.find(result => result.blockId === block.id)) {
            layoutResults.push({
                blockId: block.id,
                position: lastPos + 1,
                isRotated
            });
            lastPos++;
        }
    }

    return layoutResults;
}

console.log(layout(blocks));
