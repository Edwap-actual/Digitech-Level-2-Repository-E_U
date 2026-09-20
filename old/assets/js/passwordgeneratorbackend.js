// DIGITECH JAVASCRIPT PASSWORD GENERATOR BACKEND
// This code is responsible for generating secure passwords based on user-defined criteria.
// It includes functions to create random passwords, validate user input, and handle password generation requests.
// The password generator supports various character sets, including uppercase letters, lowercase letters, numbers, and special characters.
// The generated passwords can be customized in length and complexity according to user preferences.
// The code also includes error handling to ensure that the generated passwords meet security standards and user requirements, while also meeting NCEA criteria
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// Code Begin :)
const LOWERCASE = 'qwertyuiopasdfghjklzxcvbnm';
const UPPERCASE = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const NUMBERS = '1234567890';
const SPECIAL_CHARACTERS = '!@#$%^&*()_+[]{}|;:,.<>?';
// These are the constants that define the sets of characters to be used in password generation. 
// The strings contain all the possible characters that can be included in the generated passwords.
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function getRandomCharacter(characters) {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    
    const randomIndex = randomArray[0] % characters.length;


    return characters[randomIndex];
}
// This function takes a string of characters as input, and returns a random character from that string.
// It uses the Web Crypto Application Programming Interface (API) to generate a cryptographically secure random number.
// That random number is then used to select a character from the input string.
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function shufflePassword(password) {
    const characters = password.split('');

    for (let i = characters.length - 1; i > 0; i--) {
        const randomArray = new Uint32Array(1);
        crypto.getRandomValues(randomArray);

        const randomIndex = randomArray[0] % (i + 1);

        [characters[i], characters[randomIndex]] = [characters[randomIndex], characters[i]];
    }

    return characters.join('');
}
// This function takes a password string as input and shuffles its characters randomly.
// It uses the Fisher-Yates shuffle algorithm to ensure that the characters are rearranged in a random order.
// The function returns the shuffled password as a new string.
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function validateSettings(length, includeLowercase, includeUppercase, includeNumbers, includeSpecial) {
    if (!Number.isInteger(length) || length < 8 || length > 30) {
        alert("Password length must be between 8 and 30 characters.");
        return false;
    }
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSpecial) {
        alert("Please select at least one character type.");
        return false;
    }

    return true;
}
// This function validates the user-defined settings for password generation.
// It checks if the specified length is an integer between 8 and 30, and ensures that at least one character type is selected.
// If any validation fails, it displays an alert message and returns false; otherwise, it returns true.
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function generatePassword() {
    const length = Number(document.getElementById("passwordLength").value);

    const useLowercase = document.getElementById("lowercase").checked;
    const useUppercase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSpecial = document.getElementById("special").checked;

    if (!validateSettings(length, useLowercase, useUppercase, useNumbers, useSpecial)) {
        return;
    }

    let characterPool = "";

    if (useLowercase) {
        characterPool += LOWERCASE;
    }

    if (useUppercase) {
        characterPool += UPPERCASE;
    }

    if (useNumbers) {
        characterPool += NUMBERS;
    }

    if (useSpecial) {
        characterPool += SPECIAL_CHARACTERS;
    }

    let password = "";

    if (useLowercase) {
        password += getRandomCharacter(LOWERCASE);
    }

    if (useUppercase) {
        password += getRandomCharacter(UPPERCASE);
    }

    if (useNumbers) {
        password += getRandomCharacter(NUMBERS);
    }

    if (useSpecial) {
        password += getRandomCharacter(SPECIAL_CHARACTERS);
    }

    while (password.length < length) {
        password += getRandomCharacter(characterPool);
    }

    password = shufflePassword(password);

    document.getElementById("passwordOutput").value = password;
}

// This function is the main entry point for generating a password based on user-defined settings.
// It retrieves the user input for password length and character types, validates the settings, and constructs a character pool based on the selected options.
// The function ensures that at least one character from each selected type is included in the password, fills the remaining length with random characters from the pool, shuffles the password, and finally displays it in the output field.   
//------------------------------------------------------------------------------------------------------------------------------------------------------------

function copyPassword() {

    const password =
        document.getElementById("passwordOutput").value;

    if (password === "") {
        alert("Please generate a password first.");
        return;
    }

    navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied to clipboard.");
        })
        .catch(() => {
            alert("Unable to copy the password.");
        });
}
// This function copies the generated password to the clipboard.
// It first checks if a password has been generated; if not, it alerts the user to generate one first.
// If a password is present, it uses the Clipboard API to copy the password to the clipboard and provides feedback to the user on success or failure.
//------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("generateButton")
    .addEventListener("click", generatePassword);

    document.getElementById("copyButton")
    .addEventListener("click", copyPassword);

    // This code adds event listeners to the "Generate Password" and "Copy Password" buttons.
    // When the "Generate Password" button is clicked, it triggers the generatePassword function to create a new password based on user-defined settings.
    // When the "Copy Password" button is clicked, it triggers the copyPassword function to copy the generated password to the clipboard.
    //------------------------------------------------------------------------------------------------------------------------------------------------------------



// End of DIGITECH JAVASCRIPT PASSWORD GENERATOR BACKEND
//Fin :)
// ------------------------------------------------------------------------------------------------------------------------------------------------------------