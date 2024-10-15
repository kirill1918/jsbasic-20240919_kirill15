<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <td>1:1</td>
            <td>1:2</td>
            <td>1:3</td>
            <td>1:4</td>
            <td>1:5</td>
        </tr>
        <tr>
            <td>2:1</td>
            <td>2:2</td>
            <td>2:3</td>
            <td>2:4</td>
            <td>2:5</td>
        </tr>
        <tr>
            <td>3:1</td>
            <td>3:2</td>
            <td>3:3</td>
            <td>3:4</td>
            <td>3:5</td>
        </tr>
        <tr>
            <td>4:1</td>
            <td>4:2</td>
            <td>4:3</td>
            <td>4:4</td>
            <td>4:5</td>
        </tr>
        <tr>
            <td>5:1</td>
            <td>5:2</td>
            <td>5:3</td>
            <td>5:4</td>
            <td>5:5</td>
        </tr>
    </table>
    <script>
        function makeDiagonalRed(table){
            for (let i = 0; i < table.rows.length; i++){
                let cell = table.rows[i].cells[i]; // .rows возвращает строку а .cell возвращает ячейку
                cell.style.backgroundColor = 'red'

            }
        }
        makeDiagonalRed(document.querySelector('table'))
    </script>
</body>
</html>
