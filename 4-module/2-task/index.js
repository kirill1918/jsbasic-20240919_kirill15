function makeDiagonalRed(table){
            for (let i = 0; i < table.rows.length; i++){
                let cell = table.rows[i].cells[i]; // .rows возвращает строку а .cell возвращает ячейку
                cell.style.backgroundColor = 'red'

            }
        }
        makeDiagonalRed(document.querySelector('table'))
