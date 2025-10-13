// Run this in browser console to clear all notifications
// Open DevTools (F12), go to Console tab, and paste this code:

localStorage.removeItem('ecolinda_notifications');
console.log('✅ All notifications cleared!');
console.log('🔄 Refresh the page to see new unique notifications.');

// Or clear all EcoLinda data:
// Object.keys(localStorage).forEach(key => {
//   if (key.startsWith('ecolinda_')) {
//     localStorage.removeItem(key);
//   }
// });
