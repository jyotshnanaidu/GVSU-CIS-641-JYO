class SessionStore {
  // Method to retrieve a string from session based on user ID
  getFromSession(userId: string): string | null {
      return sessionStorage.getItem(userId); // Return the stored value or null if not found
  }

  // Method to store user ID and password string in session
  storeInSession(userId: string, pwd: string): void {
      sessionStorage.setItem(userId, pwd); // Store the password string associated with the user ID
  }
}



export default SessionStore;