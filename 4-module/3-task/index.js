function highlight(table) {
  const tbody = table.querySelector('tbody');
  const rows = tbody.rows;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const statusCell = row.cells[3];
    const genderCell = row.cells[2];
    const ageCell = row.cells[1];

    
    if (statusCell) {
      if (statusCell.hasAttribute('data-available')) {
        const availableValue = statusCell.getAttribute('data-available');

        if (availableValue === 'true') {
          statusCell.classList.add('available');
        } else if (availableValue === 'false') {
          statusCell.classList.add('unavailable');
        }
      } else {
        
        statusCell.hidden = true;
      }
    }

    
    if (genderCell) {
      const genderText = genderCell.textContent.trim();
      if (genderText === 'm') {
        genderCell.classList.add('male');
      } else if (genderText === 'f') {
        genderCell.classList.add('female');
      }
    }

    
    if (ageCell) {
      const age = Number(ageCell.textContent);

      if (age < 18) {
        ageCell.style.textDecoration = 'line-through';
      }
    }
  }
}

