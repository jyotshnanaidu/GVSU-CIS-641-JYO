import CharacterType from "../enum/CharacterType";

class User {
  // Properties
  userId: string;
  passwordLength: number;
  charPrefs: CharacterType[];
  ambiguous: boolean;
  specific_chars:string;

  // Constructor
  constructor(userId: string, passwordLength: number, charPrefs: CharacterType[], ambiguous: boolean, specific_chars:string) {
    this.userId = userId;
    this.passwordLength = passwordLength;
    this.charPrefs = charPrefs;
    this.ambiguous = ambiguous;
    this.specific_chars = specific_chars;
  }

  // Method to display user information
  displayInfo(): void {
    console.log(`Password Length: ${this.passwordLength}`);
    console.log(`Character Preferences: ${this.charPrefs.map(pref => CharacterType[pref]).join(', ')}`);
  }
}

export default User;
// const user = new User(12, [CharacterType.LowerCase, CharacterType.UpperCase, CharacterType.Numbers]);
// user.displayInfo();