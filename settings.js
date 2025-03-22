function getPatterns() {
  return new Promise((resolve) => {
    browser.storage.local.get('patterns').then(async (result) => {
      if (!result.patterns) {
        await browser.storage.sync.set({ patterns: [] });
        resolve([]);
      } else {
        resolve(result.patterns);
      }
    });
  });
}

function setPatterns(patterns) {
  return new Promise((resolve) => {
    browser.storage.local.set({ patterns }).then(resolve);
  });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', async () => {
  const patternForm = document.getElementById('patternForm');
  const patternInput = document.getElementById('patternInput');
  const patternList = document.getElementById('patternList');
  
  // Load existing patterns
  let patterns = await getPatterns();
  renderPatterns();

  // Handle form submission
  patternForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pattern = patternInput.value.trim();
    
    try {
      // Test if the pattern is valid regex
      new RegExp(pattern);
      
      // Add new pattern
      patterns.push(pattern);
      await setPatterns(patterns);
      
      // Clear input and refresh list
      patternInput.value = '';
      renderPatterns();
    } catch (error) {
      alert('Invalid regular expression pattern');
    }
  });

  // Handle pattern deletion
  patternList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = parseInt(e.target.dataset.index);
      patterns.splice(index, 1);
      await setPatterns(patterns);
      renderPatterns();
    }
  });

  // Render patterns list
  function renderPatterns() {
    // Clear existing list
    patternList.textContent = '';
    
    if (!patterns.length) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'px-4 py-3 text-gray-500 dark:text-gray-400';
      emptyLi.textContent = 'No patterns added yet';
      patternList.appendChild(emptyLi);
      return;
    }
    
    patterns.forEach((pattern, index) => {
      const li = document.createElement('li');
      li.className = 'px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white';
      
      const span = document.createElement('span');
      span.className = 'font-mono';
      span.textContent = pattern;
      
      const button = document.createElement('button');
      button.className = 'delete-btn px-2 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none';
      button.dataset.index = index;
      button.textContent = 'Delete';
      
      li.appendChild(span);
      li.appendChild(button);
      patternList.appendChild(li);
    });
  }

  // Helper function to escape HTML
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});



