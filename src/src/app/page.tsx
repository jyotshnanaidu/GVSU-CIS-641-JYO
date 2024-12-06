'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CharacterType from './enum/CharacterType';
import User from './model/User';
import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard';
import APISupport from './model/APISupport';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import PasswordGen from './model/PasswordGen';
import SessionStore from './model/SessionStore';

export default function Home() {
  const [sliderValue, setSliderValue] = useState(8);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [generatedUser, setGeneratedUser] = useState<String | null>(null);
  const [recentPasswords, setRecentPasswords] = useState<string[]>([]); // Store recent passwords
  const [breachStatus, setBreachStatus] = useState<{ [key: string]: boolean }>({}); // Store breach status for each password
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false); // Toggle ambiguous characters
  const [charList, setCharList] = useState<string>('');


  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const getImageSrc = () => {
    if (sliderValue <= 10) {
      return '/images/ten.png';
    } else if (sliderValue <= 15) {
      return '/images/twenty.png';
    } else {
      return '/images/thirty.png';
    }
  };

  const generateUser = () => {
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    const charPrefs: CharacterType[] = [];

    if (lowerCase) charPrefs.push(CharacterType.LowerCase);
    if (upperCase) charPrefs.push(CharacterType.UpperCase);
    if (numbers) charPrefs.push(CharacterType.Numbers);
    if (symbols) charPrefs.push(CharacterType.Symbols);


    const user = new User(
      userId,
      sliderValue,
      charPrefs,
      excludeAmbiguous,
      charList
    );
    const session = new SessionStore();
    const pwd = new PasswordGen().generatePassword(user);
    setGeneratedUser(pwd);
    console.log(userId);
    session.storeInSession(user.userId, pwd);
    setRecentPasswords(prev => [...prev, pwd]); // Add to recent passwords
    checkBreachStatus(pwd);
    console.log(session.getFromSession(userId));

  };
  const handleCharListChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCharList(event.target.value); // Update state with the input's value
  };

  const copyToClipboard = (userId: string) => {
    navigator.clipboard.writeText(userId)
      .then(() => {
        alert(`Password Copied to clipboard!`); // Alert on successful copy
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const checkBreachStatus = (passwordId: string) => {
    new APISupport().checkBreachStatus(passwordId).then((status) => {
      setBreachStatus(prev => ({ ...prev, [passwordId]: status })); // Store the breach status
    });
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header style={{ backgroundColor: '#0A192F' }} className="text-white py-4 flex items-center justify-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLock} className="w-6 h-6" />
          <h1 className="ml-2 text-2xl font-bold">FortiPass</h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8">
        <h2 className="text-3xl mb-4 text-center">Choose Strength</h2>

        {/* Image Display */}
        <img src={getImageSrc()} alt="Dynamic" className="mb-4 rounded-lg max-w-full" style={{ width: '200px', height: 'auto' }} />

        {/* Range Slider */}
        <div className="flex justify-center w-full mb-4">
          <input
            type="range"
            min="8"
            max="20"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full sm:w-3/5 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            style={{ background: '#0A192F' }}
          />
          {sliderValue}
        </div>

        {/* Checkboxes Section */}
        <div className="flex flex-wrap justify-center space-x-4 mb-4">
          <label className="flex items-center mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={lowerCase}
              onChange={() => setLowerCase(!lowerCase)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black">Lower Case</span>

          </label>

          <label className="flex items-center mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={upperCase}
              onChange={() => setUpperCase(!upperCase)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black">Upper Case</span>

          </label>

          <label className="flex items-center mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black">Numbers</span>
          </label>

          <label className="flex items-center mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black">Symbols</span>
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={() => setExcludeAmbiguous(!excludeAmbiguous)}
            />
             Exclude Ambiguous Characters [o,0,I]
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="input"
              onChange={handleCharListChange}
              placeholder='Include Sabrina | Carol......'
            />
          </label>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
          onClick={generateUser}
        >
          Generate
        </button>
        <div className="mt-6 w-full max-w-lg">
          <h3 className="text-2xl mb-2 text-center">Recent Passwords</h3>
          <ul className="space-y-2">
            {recentPasswords.map((passwordId) => (
              <li key={passwordId} className="flex justify-between items-center bg-white shadow-md p-3 rounded">
                <span className="text-lg">{passwordId}</span>
                <div className="flex space-x-2">
                  {/* Conditional rendering based on breach status */}
                  {breachStatus[passwordId] === undefined ? (
                    <span>Checking for breach...</span> 
                  ) : breachStatus[passwordId] === false ? (
                    <>
                      <FontAwesomeIcon
                        icon={faClipboard}
                        className="text-white-500"
                        onClick={() => copyToClipboard(passwordId)} // Copy to clipboard on click
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                        onClick={() => { }}
                      />
                    </>
                  ) : (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-red-500 opacity-50 cursor-not-allowed" // Disabled style
                    />
                  )}

                </div>
              </li>
            ))}
          </ul>
        </div>


      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2024 All rights reserved.</p>
      </footer>
    </div>
  );
}
