document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
      });
    }
    
    // Check if mobile
    function isMobile() {
      return window.innerWidth < 768;
    }
    
    // Character counter for post input
    const postInput = document.querySelector('.post-input');
    const charCount = document.querySelector('.char-count');
    
    if (postInput && charCount) {
      const maxChars = 250;
      
      postInput.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        charCount.textContent = remaining >= 0 ? remaining : 0;
        
        if (remaining < 0) {
          charCount.style.color = '#e11d48';
        } else {
          charCount.style.color = '#666';
        }
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && event.target !== menuToggle) {
          mobileMenu.classList.remove('active');
        }
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (!isMobile() && mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                content.style.display = 'none';
            }
        });
        
        // Toggle dropdown on button click
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            const isDisplayed = content.style.display === 'block';
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown-content').forEach(el => {
                el.style.display = 'none';
            });
            
            // Toggle current dropdown
            content.style.display = isDisplayed ? 'none' : 'block';
        });
        
        // Handle dropdown item selection
        const links = content.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                btn.textContent = this.textContent + ' ';
                const icon = document.createElement('i');
                icon.className = 'fas fa-chevron-down';
                btn.appendChild(icon);
                content.style.display = 'none';
            });
        });
    });
    
    // Add New button functionality
    const addNewBtn = document.querySelector('.add-new-btn');
    addNewBtn.addEventListener('click', function() {
        alert('Add New Product functionality would go here');
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Product detail view would go here
            console.log('Product clicked:', this.querySelector('h3').textContent);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  const conversationItems = document.querySelectorAll('.conversation-item');
  const chatArea = document.querySelector('.chat-area');
  const emptyState = document.querySelector('.empty-state');
  const backToListBtn = document.querySelector('.back-to-list');
  const currentChatName = document.getElementById('current-chat-name');
  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('message-input');
  const sendMessageBtn = document.getElementById('send-message');
  
  // Sample messages for each user
  const userMessages = {
      steason: [
          { text: "Hey there! I'm hosting a private live stream tonight.", sender: "steason", time: "2:30 PM" },
          { text: "Join the private live stream from this link: stream.example.com/live", sender: "steason", time: "2:31 PM" },
          { text: "It's going to be awesome!", sender: "steason", time: "2:32 PM" },
          { text: "Thanks, I'll try to join!", sender: "me", time: "2:45 PM" }
      ],
      admin: [
          { text: "Hello! I've updated my profile with a new look.", sender: "admin", time: "11:20 AM" },
          { text: "Check my new Buttery SmoothLook!", sender: "admin", time: "11:21 AM" },
          { text: "Here's a preview:", sender: "admin", time: "11:21 AM", isImage: true },
          { text: "Looks great! Very professional.", sender: "me", time: "11:30 AM" },
          { text: "Thanks! I spent a lot of time on it.", sender: "admin", time: "11:32 AM" }
      ]
  };
  
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  // Handle conversation item click
  conversationItems.forEach(item => {
      item.addEventListener('click', function() {
          const user = this.getAttribute('data-user');
          
          // Update active states
          conversationItems.forEach(conv => conv.classList.remove('active'));
          this.classList.add('active');
          
          // Update chat header with user info
          currentChatName.textContent = user.charAt(0).toUpperCase() + user.slice(1);
          
          // Clear previous messages
          chatMessages.innerHTML = '';
          
          // Load messages for this user
          loadMessages(user);
          
          // Show chat area, hide empty state
          chatArea.classList.add('active');
          emptyState.style.display = 'none';
          
          // For mobile, add chat-view class to container
          if (isMobile) {
              container.classList.add('chat-view');
          }
      });
  });
  
  // Handle back button click on mobile
  backToListBtn.addEventListener('click', function() {
      chatArea.classList.remove('active');
      container.classList.remove('chat-view');
  });
  
  // Load messages for a specific user
  function loadMessages(user) {
      const messages = userMessages[user] || [];
      
      messages.forEach(msg => {
          const messageEl = document.createElement('div');
          messageEl.classList.add('message');
          messageEl.classList.add(msg.sender === 'me' ? 'sent' : 'received');
          
          if (msg.isImage) {
              const imgContainer = document.createElement('div');
              imgContainer.style.width = '200px';
              imgContainer.style.height = '150px';
              imgContainer.style.overflow = 'hidden';
              imgContainer.style.borderRadius = '10px';
              imgContainer.style.marginBottom = '5px';
              
              const img = document.createElement('img');
              img.src = '/placeholder.svg?height=150&width=200';
              img.alt = 'Shared image';
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.objectFit = 'cover';
              
              imgContainer.appendChild(img);
              messageEl.appendChild(imgContainer);
          }
          
          const textEl = document.createElement('p');
          textEl.textContent = msg.text;
          messageEl.appendChild(textEl);
          
          const timeEl = document.createElement('div');
          timeEl.classList.add('message-time');
          timeEl.textContent = msg.time;
          messageEl.appendChild(timeEl);
          
          chatMessages.appendChild(messageEl);
      });
      
      // Scroll to bottom of messages
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Handle sending a new message
  sendMessageBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });
  
  function sendMessage() {
      const text = messageInput.value.trim();
      if (!text) return;
      
      // Get active conversation
      const activeConversation = document.querySelector('.conversation-item.active');
      if (!activeConversation) return;
      
      const user = activeConversation.getAttribute('data-user');
      
      // Create new message
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeStr = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      
      const newMessage = {
          text: text,
          sender: 'me',
          time: timeStr
      };
      
      // Add to messages array
      userMessages[user].push(newMessage);
      
      // Add to DOM
      const messageEl = document.createElement('div');
      messageEl.classList.add('message', 'sent');
      
      const textEl = document.createElement('p');
      textEl.textContent = text;
      messageEl.appendChild(textEl);
      
      const timeEl = document.createElement('div');
      timeEl.classList.add('message-time');
      timeEl.textContent = timeStr;
      messageEl.appendChild(timeEl);
      
      chatMessages.appendChild(messageEl);
      
      // Clear input
      messageInput.value = '';
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Simulate reply after 1-3 seconds
      if (Math.random() > 0.3) {
          setTimeout(() => {
              simulateReply(user);
          }, 1000 + Math.random() * 2000);
      }
  }
  
  // Simulate a reply from the other user
  function simulateReply(user) {
      const replies = {
          steason: [
              "Hope to see you there!",
              "It starts at 8 PM EST.",
              "Don't forget to bring your questions!",
              "I'll be sharing some exclusive content."
          ],
          admin: [
              "I'm glad you like it!",
              "I can help you with your profile too if you want.",
              "The key is good lighting and a clean background.",
              "What do you think of the color scheme?"
          ]
      };
      
      const possibleReplies = replies[user] || [];
      if (possibleReplies.length === 0) return;
      
      const replyText = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
      
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeStr = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      
      const newMessage = {
          text: replyText,
          sender: user,
          time: timeStr
      };
      
      // Add to messages array
      userMessages[user].push(newMessage);
      
      // Add to DOM
      const messageEl = document.createElement('div');
      messageEl.classList.add('message', 'received');
      
      const textEl = document.createElement('p');
      textEl.textContent = replyText;
      messageEl.appendChild(textEl);
      
      const timeEl = document.createElement('div');
      timeEl.classList.add('message-time');
      timeEl.textContent = timeStr;
      messageEl.appendChild(timeEl);
      
      chatMessages.appendChild(messageEl);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Initialize with first conversation if on desktop
  if (!isMobile && conversationItems.length > 0) {
      conversationItems[0].click();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Sample data for different time periods
  const chartData = {
      current: {
          labels: ['1', '5', '10', '15', '20', '25', '30'],
          datasets: {
              all: [120, 190, 300, 250, 420, 380, 450],
              subscriptions: [80, 100, 120, 100, 150, 170, 200],
              tips: [30, 70, 150, 120, 200, 150, 180],
              ppv: [10, 20, 30, 30, 70, 60, 70]
          }
      },
      last: {
          labels: ['1', '5', '10', '15', '20', '25', '30'],
          datasets: {
              all: [100, 150, 200, 300, 350, 400, 380],
              subscriptions: [60, 80, 90, 120, 140, 160, 150],
              tips: [30, 50, 80, 130, 150, 180, 170],
              ppv: [10, 20, 30, 50, 60, 60, 60]
          }
      },
      '3months': {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: {
              all: [800, 1200, 1500],
              subscriptions: [400, 600, 700],
              tips: [300, 400, 500],
              ppv: [100, 200, 300]
          }
      },
      '6months': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: {
              all: [800, 1200, 1500, 1300, 1700, 2000],
              subscriptions: [400, 600, 700, 600, 800, 900],
              tips: [300, 400, 500, 500, 600, 800],
              ppv: [100, 200, 300, 200, 300, 300]
          }
      },
      year: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: {
              all: [800, 1200, 1500, 1300, 1700, 2000, 1800, 2200, 2500, 2300, 2700, 3000],
              subscriptions: [400, 600, 700, 600, 800, 900, 800, 1000, 1200, 1100, 1300, 1400],
              tips: [300, 400, 500, 500, 600, 800, 700, 900, 1000, 900, 1100, 1200],
              ppv: [100, 200, 300, 200, 300, 300, 300, 300, 300, 300, 300, 400]
          }
      }
  };

  // Get the chart canvas element
  const ctx = document.getElementById('earningsChart').getContext('2d');
  
  // Initialize the chart with current month data
  let currentChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: chartData.current.labels,
          datasets: [
              {
                  label: 'Total Earnings',
                  data: chartData.current.datasets.all,
                  backgroundColor: 'rgba(233, 30, 99, 0.1)',
                  borderColor: '#e91e63',
                  borderWidth: 2,
                  pointBackgroundColor: '#e91e63',
                  pointRadius: 4,
                  tension: 0.3,
                  fill: true
              },
              {
                  label: 'Subscriptions',
                  data: chartData.current.datasets.subscriptions,
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  borderColor: '#2196f3',
                  borderWidth: 2,
                  pointBackgroundColor: '#2196f3',
                  pointRadius: 4,
                  tension: 0.3,
                  hidden: true
              },
              {
                  label: 'Tips',
                  data: chartData.current.datasets.tips,
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  borderColor: '#ff9800',
                  borderWidth: 2,
                  pointBackgroundColor: '#ff9800',
                  pointRadius: 4,
                  tension: 0.3,
                  hidden: true
              },
              {
                  label: 'Pay Per View',
                  data: chartData.current.datasets.ppv,
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderColor: '#4caf50',
                  borderWidth: 2,
                  pointBackgroundColor: '#4caf50',
                  pointRadius: 4,
                  tension: 0.3,
                  hidden: true
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
                  callbacks: {
                      label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                              label += ': ';
                          }
                          if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat('en-US', { 
                                  style: 'currency', 
                                  currency: 'USD',
                                  minimumFractionDigits: 2
                              }).format(context.parsed.y);
                          }
                          return label;
                      }
                  }
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false
                  }
              },
              y: {
                  beginAtZero: true,
                  ticks: {
                      callback: function(value) {
                          return '$' + value;
                      }
                  }
              }
          }
      }
  });

  // Handle period filter change
  document.getElementById('chart-period').addEventListener('change', updateChart);
  
  // Handle type filter change
  document.getElementById('chart-type').addEventListener('change', updateChart);
  
  // Update chart based on selected filters
  function updateChart() {
      const periodFilter = document.getElementById('chart-period').value;
      const typeFilter = document.getElementById('chart-type').value;
      
      // Get data for selected period
      const selectedPeriodData = chartData[periodFilter];
      
      // Update chart labels
      currentChart.data.labels = selectedPeriodData.labels;
      
      // Show/hide datasets based on type filter
      if (typeFilter === 'all') {
          // Show total earnings, hide others
          currentChart.data.datasets[0].hidden = false;
          currentChart.data.datasets[1].hidden = true;
          currentChart.data.datasets[2].hidden = true;
          currentChart.data.datasets[3].hidden = true;
          
          // Update total earnings data
          currentChart.data.datasets[0].data = selectedPeriodData.datasets.all;
      } else {
          // Hide total earnings, show selected type
          currentChart.data.datasets[0].hidden = true;
          
          if (typeFilter === 'subscriptions') {
              currentChart.data.datasets[1].hidden = false;
              currentChart.data.datasets[2].hidden = true;
              currentChart.data.datasets[3].hidden = true;
              currentChart.data.datasets[1].data = selectedPeriodData.datasets.subscriptions;
          } else if (typeFilter === 'tips') {
              currentChart.data.datasets[1].hidden = true;
              currentChart.data.datasets[2].hidden = false;
              currentChart.data.datasets[3].hidden = true;
              currentChart.data.datasets[2].data = selectedPeriodData.datasets.tips;
          } else if (typeFilter === 'ppv') {
              currentChart.data.datasets[1].hidden = true;
              currentChart.data.datasets[2].hidden = true;
              currentChart.data.datasets[3].hidden = false;
              currentChart.data.datasets[3].data = selectedPeriodData.datasets.ppv;
          }
      }
      
      // Update all datasets data (even if hidden)
      currentChart.data.datasets[0].data = selectedPeriodData.datasets.all;
      currentChart.data.datasets[1].data = selectedPeriodData.datasets.subscriptions;
      currentChart.data.datasets[2].data = selectedPeriodData.datasets.tips;
      currentChart.data.datasets[3].data = selectedPeriodData.datasets.ppv;
      
      // Update chart
      currentChart.update();
  }
  
  // Handle legend clicks
  const legendItems = document.querySelectorAll('.legend-item');
  legendItems.forEach((item, index) => {
      item.addEventListener('click', function() {
          // Toggle dataset visibility
          const isHidden = currentChart.isDatasetHidden(index);
          currentChart.setDatasetVisibility(index, isHidden);
          
          // Toggle legend item opacity
          this.style.opacity = isHidden ? 1 : 0.5;
          
          currentChart.update();
      });
  });
});


///////eidti-page//////////
document.addEventListener('DOMContentLoaded', function() {
    // Toggle switch functionality
    const toggleSwitch = document.getElementById('showUsername');
    const fullNameField = document.getElementById('fullname');
    const usernameField = document.getElementById('username');
    
    // Date picker functionality (simplified)
    const dobField = document.getElementById('dob');
    dobField.addEventListener('focus', function() {
        // In a real implementation, you would initialize a date picker here
        console.log('Date picker would open here');
    });
    
    // Form validation
    const form = document.querySelector('.edit-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate required fields
        if (!fullNameField.value.trim()) {
            markInvalid(fullNameField, 'Full name is required');
            isValid = false;
        } else {
            markValid(fullNameField);
        }
        
        if (!usernameField.value.trim()) {
            markInvalid(usernameField, 'Username is required');
            isValid = false;
        } else {
            markValid(usernameField);
        }
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            markInvalid(emailField, 'Please enter a valid email address');
            isValid = false;
        } else {
            markValid(emailField);
        }
        
        if (isValid) {
            console.log('Form submitted successfully');
            // Here you would typically send the data to a server
            alert('Profile updated successfully!');
        }
    });
    
    // Helper functions for form validation
    function markInvalid(field, message) {
        field.classList.add('invalid');
        
        // Remove any existing error message
        const parent = field.parentElement;
        let errorMessage = parent.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            parent.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }
    
    function markValid(field) {
        field.classList.remove('invalid');
        const parent = field.parentElement;
        const errorMessage = parent.querySelector('.error-message');
        if (errorMessage) {
            parent.removeChild(errorMessage);
        }
    }
    
    // Add event listeners to all form fields to clear validation on input
    const formFields = form.querySelectorAll('input, select');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('invalid');
            const parent = this.parentElement;
            const errorMessage = parent.querySelector('.error-message');
            if (errorMessage) {
                parent.removeChild(errorMessage);
            }
        });
    });
    
    // Add a submit button to the form (not shown in the image but needed for functionality)
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'submit-button';
    submitButton.textContent = 'Save Changes';
    form.appendChild(submitButton);
    
    // Style the submit button
    const style = document.createElement('style');
    style.textContent = `
        .submit-button {
            background-color: #e91e63;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        
        .submit-button:hover {
            background-color: #d81b60;
        }
        
        .invalid {
            border-color: #f44336 !important;
        }
        
        .error-message {
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});
// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile sidebar toggle button
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Create the toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-sidebar-toggle';
        toggleButton.innerHTML = 'Menu <i class="fas fa-chevron-down"></i>';
        
        // Insert the button before the sidebar
        sidebar.parentNode.insertBefore(toggleButton, sidebar);
        
        // Add click event to toggle sidebar
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Rest of your existing JavaScript...
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Mobile sidebar toggle
    const toggleButton = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Toggle switch functionality
    const toggleSwitches = document.querySelectorAll('.toggle input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // You can add specific functionality for each toggle here
            console.log('Toggle changed:', this.checked);
        });
    });
    
    // File upload functionality
    const browseBtn = document.querySelector('.browse-btn');
    if (browseBtn) {
        browseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, you would trigger a file input here
            console.log('Browse button clicked');
        });
    }
    
    // Delete file functionality
    const deleteBtn = document.querySelector('.file-action-btn.delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const uploadedFile = document.querySelector('.uploaded-file');
            if (uploadedFile) {
                uploadedFile.style.display = 'none';
                console.log('File deleted');
            }
        });
    }
    
    // Save changes functionality
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Changes saved');
            // In a real implementation, you would submit the form data here
            alert('Changes saved successfully!');
        });
    }
});


