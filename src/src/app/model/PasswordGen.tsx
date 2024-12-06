import CharacterType from "../enum/CharacterType";
import User from "./User";

class PasswordGen {
  private static readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly NUMBERS = '0123456789';
  private static readonly SPECIAL_CHARACTERS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  generatePassword(user: User): string {

    let characterPool = '';

    // Build the character pool based on user preferences
    if (user.charPrefs.includes(CharacterType.LowerCase)) {
      characterPool += PasswordGen.LOWERCASE;
    }
    if (user.charPrefs.includes(CharacterType.UpperCase)) {
      characterPool += PasswordGen.UPPERCASE;
    }
    if (user.charPrefs.includes(CharacterType.Numbers)) {
      characterPool += PasswordGen.NUMBERS;
    }
    if (user.charPrefs.includes(CharacterType.Symbols)) {
      characterPool += PasswordGen.SPECIAL_CHARACTERS;
    }

    // Generate the password
    console.log(characterPool.length + " " + user.passwordLength);

    let password = '';
    let ambiguous_exists_len = user.ambiguous ? 3 : 0;
    let modified_len = user.specific_chars ? user.specific_chars.trim().length : 0;
    for (let i = 0; i < user.passwordLength - modified_len + ambiguous_exists_len; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }
    console.log(password);
    password.replaceAll('[0oI]', '');
    let arr = [user.specific_chars ? user.specific_chars.trim() + password : password, user.specific_chars ? password + user.specific_chars.trim() : password];
    return arr[this.generateRandom()];
  }
  generateRandom() {
    const randomNum = Math.floor(Math.random() * 2);
    return randomNum;
  }
}


export default PasswordGen;