class APISupport{
  private readonly API_URL = 'https://api.pwnedpasswords.com/range/';

  async checkBreachStatus(pwd: string): Promise<boolean> {
      // Hash the password and extract the first 5 characters for the API call
      const hashedPwd = await this.hashPassword(pwd);
      const hashPrefix = hashedPwd.substring(0, 5);
      const hashSuffix = hashedPwd.substring(5);

      // Construct the API URL
      const url = `${this.API_URL}${hashPrefix}`;

      try {
          // Fetch the API response
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'User-Agent': 'fortipass',
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Get the response text
          const responseText = await response.text();

          // Check if the password hash suffix is in the response
          const breachStatus = this.checkForBreach(responseText, hashSuffix);

          return breachStatus;
      } catch (error) {
          console.error('Error checking breach status:', error);
          return false;
      }
  }

  private async hashPassword(pwd: string): Promise<string> {
      // Use the crypto API to hash the password
      const encoder = new TextEncoder();
      const data = encoder.encode(pwd);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      return hash;
  }

  private checkForBreach(responseText: string, hashSuffix: string): boolean {
      // Split the response text into lines
      const lines = responseText.split('\n');

      // Check each line for the hash suffix
      for (const line of lines) {
          const [hash, count] = line.split(':');
          if (hash === hashSuffix) {
              return true;
          }
      }

      return false;
  }
}

const apiSupport = new APISupport();
apiSupport.checkBreachStatus('your_password').then((status) => console.log(status));
export default  APISupport;