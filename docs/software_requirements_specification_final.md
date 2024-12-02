# Requirements Document

## Functional Requirements

### 1. Password Generation Features
- **1.1** The application shall generate a password when the user clicks the "Generate" button.
- **1.2** The user shall have the option to specify the desired length of the password, with a minimum of 8 and a maximum of 20 characters.
- **1.3** The application shall allow users to include or exclude specific character types, such as uppercase letters, lowercase letters, numbers, and special symbols.
- **1.4** The application shall include a "Copy to Clipboard" button to easily copy the generated password for use elsewhere.
- **1.5** The application shall provide a "Regenerate Password" button to create a new password without refreshing the page.

### 2. Password Customization Features
- **2.1** The application shall allow users to specify the exact number of uppercase, lowercase, numeric, and special characters in the password.
- **2.2** The application shall offer a toggle to avoid ambiguous characters (e.g., 'O', '0', 'I', 'l').
- **2.3** The application shall enable users to exclude specific characters or sequences (e.g., "123", "abc").
- **2.4** The application shall provide a preview option to show a sample of the password based on current settings.
- **2.5** The application shall allow users to lock selected characters in place and regenerate the remaining characters.

### 3. Password Management Features
- **3.1** The application shall maintain a session-based list of previously generated passwords for reference.
- **3.2** The user shall be able to delete individual entries from the session-based password history.
- **3.3** The application shall allow users to favorite specific passwords in the session history for quick access.
- **3.4** The session-based password history shall be cleared when the session ends or the user clicks the "Clear History" button.
- **3.5** The application shall offer a search feature to filter the session-based password history.

### 4. Password Strength Analysis
- **4.1** The application shall display a strength indicator (e.g., weak, moderate, strong) for the generated password based on predefined rules.
- **4.2** The application shall provide feedback on how to improve password strength (e.g., "Add special characters").
- **4.3** The application shall include a visual representation of strength (e.g., a progress bar).
- **4.4** The strength evaluation algorithm shall follow NIST guidelines for password complexity.
- **4.5** The application shall display warnings for weak passwords when users attempt to save or copy them.

### 5. User Interface Features
- **5.1** The application shall provide a responsive design to ensure usability across devices of various sizes.
- **5.2** The application shall support both light and dark modes for user convenience.
- **5.3** The user interface shall feature tooltips explaining each feature or option.
- **5.4** The application shall use keyboard shortcuts for commonly used actions like generating or copying passwords.
- **5.5** The application shall display error messages for invalid inputs (e.g., password length out of range).

---

## Non-Functional Requirements

### 1. Performance
- **1.1** The application shall generate passwords within 500 milliseconds under typical conditions.
- **1.2** The application shall allow up to 10 concurrent users without noticeable degradation in performance.
- **1.3** The application shall maintain a response time of under 2 seconds for all actions during peak usage.
- **1.4** The password strength analysis shall execute within 100 milliseconds.
- **1.5** The application shall minimize CPU and memory usage to optimize performance on low-spec devices.

### 2. Usability
- **2.1** The user interface shall be intuitive and self-explanatory for first-time users.
- **2.2** The application shall use consistent icons and terminology across all features.
- **2.3** The user interface shall include clear instructions and labels for each feature.
- **2.4** The application shall display a confirmation message after copying or saving passwords.
- **2.5** The user interface shall provide clear visual feedback for user actions (e.g., button animations).

### 3. Compatibility
- **3.1** The application shall be compatible with the latest versions of Chrome, Firefox, Safari, and Edge.
- **3.2** The application shall function correctly on both desktop and mobile web browsers.
- **3.3** The application shall support screen readers to ensure accessibility for visually impaired users.
- **3.4** The application shall not require plugins or extensions for core functionality.
- **3.5** The application shall adhere to web standards (HTML5, CSS3, and ES6 or later).

### 4. Security
- **4.1** The application shall not store generated passwords on the server to ensure privacy.
- **4.2** The application shall use a secure random number generator for password creation.
- **4.3** The application shall sanitize user inputs to prevent security vulnerabilities like XSS or injection attacks.
- **4.4** The application shall enforce HTTPS for secure communication.
- **4.5** The application shall use secure cookies to manage session-based password history.

### 5. Scalability and Maintainability
- **5.1** The application shall be designed to handle concurrent users with minimal degradation in performance.
- **5.2** The codebase shall follow modular design principles to simplify maintenance and updates.
- **5.3** The application shall include unit tests covering at least 80% of the codebase.
- **5.4** The application shall allow for easy integration with third-party APIs for future enhancements.
- **5.5** The application shall include detailed documentation for users to facilitate onboarding and troubleshooting.

# Change management plan

### Training People
Provide guidance through the organization’s technical teams, encouraging employees to adopt the application for generating secure passwords. Highlight its ease of use and long-term benefits, fostering trust in its capabilities for future password needs.

### Integrating into Their Ecosystem
Leverage the corporate cybersecurity team to endorse the tool, ensuring alignment with security policies and standards. Highlight its importance through internal campaigns and gather user feedback via forms to address concerns and enhance the tool’s functionality based on real-world use.

### Resolving Issues
As a web-based tool, it may encounter user-reported bugs over time. Planning regular fortnightly reviews to track and resolve issues ensures stability. Additionally, the company's cybersecurity team can directly raise issues on GitHub, maintaining transparency and tracking with an "open" status until resolved.


# Traceability links

## Use Case Diagram Traceability

| Artifact ID | Artifact Name                | Requirement ID |
|-------------|------------------------------|----------------|
| UseCase1    | Generate Password            | FR1.1          |
| UseCase2    | Specify Password Length      | FR1.2          |
| UseCase3    | Select Character Types       | FR1.3          |
| UseCase4    | Copy Password to Clipboard   | FR1.4          |
| UseCase5    | Regenerate Password          | FR1.5          |
| UseCase6    | Display Password Strength    | FR4.1          |
| UseCase7    | Provide Strength Feedback    | FR4.2          |
| UseCase8    | Avoid Ambiguous Characters   | FR2.2          |
| UseCase9    | Exclude Specific Characters  | FR2.3          |
| UseCase10   | View Password History        | FR3.1          |
| UseCase11   | Delete Password from History | FR3.2          |
| UseCase12   | Warn for Weak Passwords      | FR4.5          |
| UseCase13   | Support Light and Dark Modes | FR5.2          |
| UseCase14   | Tooltips for Features        | FR5.3          |
| UseCase15   | Display Error Messages       | FR5.5          |

## Class Diagram Traceability

| Artifact Name | Requirement ID                                          |
|---------------|---------------------------------------------------------|
| User          | FR1.2, FR1.3, FR2.2, FR2.3, FR4.1, FR6.1, NFR2.1        |
| PasswordGen   | FR1.1, FR1.2, FR1.3, FR1.4, FR1.5, FR1.6, FR1.7, NFR4.1 |
| SessionStore  | FR3.1, FR3.2, FR6.1, NFR2.1, NFR3.1                     |
| APISupport    | FR4.5, FR5.1, NFR1.1, NFR4.1                            |

# Software Artifacts

- [Class Diagram](https://github.com/jyotshnanaidu/GVSU-CIS-641-JYO/blob/main/artifacts/class_diagram.pdf)
- [Flow Diagram](https://github.com/jyotshnanaidu/GVSU-CIS-641-JYO/blob/main/artifacts/flow_diagram.pdf)
- [Object Diagram](https://github.com/jyotshnanaidu/GVSU-CIS-641-JYO/blob/main/artifacts/object_diagram.pdf)
- [Sequence Diagrams](https://github.com/jyotshnanaidu/GVSU-CIS-641-JYO/blob/main/artifacts/sequence_diagrams.pdf)
