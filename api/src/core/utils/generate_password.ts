const digitChars = '0123456789';
const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generate a password with a default length of 12
 * @param length
 * @returns
 */
const generateStrongPassword = (length: number = 12) => {
    // Ensures the password contains at least one character from each set
    const randomDigit = digitChars[Math.floor(Math.random() * digitChars.length)];
    const randomLower = lowerChars[Math.floor(Math.random() * lowerChars.length)];
    const randomUpper = upperChars[Math.floor(Math.random() * upperChars.length)];
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];

    // Remaining characters to fill to reach desired length
    const allChars = digitChars + lowerChars + upperChars + specialChars;
    const remainingLength = length - 4; // Subtracting the 4 already picked characters
    let remainingChars = '';

    for (let i = 0; i < remainingLength; i++) {
        remainingChars += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Combine all the characters
    const initialPassword =
        randomDigit + randomLower + randomUpper + randomSpecial + remainingChars;

    // Shuffle the combined characters to randomize their positions
    const passwordArray = initialPassword.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
};

export default generateStrongPassword;
