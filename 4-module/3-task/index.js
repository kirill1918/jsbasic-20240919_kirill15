function highlight(table) {
  let tbody = table.querySelector('tbody');
  let rows = tbody.rows;
  
  for(let i = 0; i < rows.length; i++) {
    const statusCell = rows[i].cells[3]
    const genderCell = rows[i].cells[2]
    const AgeCell = rows[i].cells[1] 

  if (statusCell) { 
    let  availableValue = statusCell.getAttribute('data-available');

    if(availableValue === 'true') { 
      statusCell.classList.add('available')
    } if(availableValue === 'false') {
      statusCell.classList.add('unavailable')
    } else { 
      statusCell.setAttribute('hidden' , true)
    } 

    
    if(genderCell === 'm') { 
    genderCell.classList.add('male')
  } else { 
    genderCell.classList.add('female')
  }

  if(AgeCell < 18) { 
    AgeCell.style.textDecoration = "line-through";
  }
}

}

}

