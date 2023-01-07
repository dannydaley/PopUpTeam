// Checks for numbers in string
export function ContainsNumber(str) {
    return /[0-9]/.test(str); // Returns true if string contains a number
};

// Checks for capital in string
export function ContainsCapital(str) {
    return /[A-Z]/.test(str); // Returns true if string contains a capital letter
};

// Checks for special characters in string
export function ContainsSpecial(str) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str); // Returns true if string contains a special character
};