export const caesarCipher = (text: string, shift: number, encrypt: boolean = true): string => {
  const s = encrypt ? shift : -shift;
  return text
    .split('')
    .map(char => {
      if (char.match(/[а-яё]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 1040 : 1072;
        const alphabetSize = char.toLowerCase() === 'ё' ? 33 : 32;
        const newCode = ((code - base + s) % alphabetSize + alphabetSize) % alphabetSize + base;
        return String.fromCharCode(newCode);
      } else if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const newCode = ((code - base + s) % 26 + 26) % 26 + base;
        return String.fromCharCode(newCode);
      }
      return char;
    })
    .join('');
};

export const vigenereCipher = (text: string, keyword: string, encrypt: boolean = true): string => {
  if (!keyword) return text;
  const key = keyword.toUpperCase().replace(/[^A-ZА-ЯЁ]/g, '');
  if (!key) return text;
  
  let keyIndex = 0;
  return text
    .split('')
    .map(char => {
      if (char.match(/[а-яё]/i)) {
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.match(/[А-ЯЁ]/) 
          ? keyChar.charCodeAt(0) - 1040 
          : keyChar.charCodeAt(0) - 65;
        keyIndex++;
        return caesarCipher(char, encrypt ? keyShift : -keyShift, true);
      } else if (char.match(/[a-z]/i)) {
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.match(/[А-ЯЁ]/) 
          ? keyChar.charCodeAt(0) - 1040 
          : keyChar.charCodeAt(0) - 65;
        keyIndex++;
        return caesarCipher(char, encrypt ? keyShift : -keyShift, true);
      }
      return char;
    })
    .join('');
};

export const atbashCipher = (text: string): string => {
  return text
    .split('')
    .map(char => {
      if (char.match(/[а-яё]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 1040 : 1072;
        const alphabetSize = 32;
        const newCode = base + (alphabetSize - 1 - (code - base));
        return String.fromCharCode(newCode);
      } else if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 65 : 97;
        const newCode = base + (25 - (code - base));
        return String.fromCharCode(newCode);
      }
      return char;
    })
    .join('');
};

export const rot13Cipher = (text: string): string => {
  return caesarCipher(text, 13, true);
};

export const reverseCipher = (text: string): string => {
  return text.split('').reverse().join('');
};

const MORSE_CODE: { [key: string]: string } = {
  'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..',
  'Е': '.', 'Ё': '.', 'Ж': '...-', 'З': '--..', 'И': '..',
  'Й': '.---', 'К': '-.-', 'Л': '.-..', 'М': '--', 'Н': '-.',
  'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...', 'Т': '-',
  'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
  'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
  'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....',
  '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
  ' ': '/'
};

export const morseCipher = (text: string, encrypt: boolean = true): string => {
  if (encrypt) {
    return text
      .toUpperCase()
      .split('')
      .map(char => MORSE_CODE[char] || char)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    const reverseMorse: { [key: string]: string } = {};
    Object.keys(MORSE_CODE).forEach(key => {
      reverseMorse[MORSE_CODE[key]] = key;
    });

    return text
      .split(' ')
      .map(code => reverseMorse[code] || code)
      .join('')
      .replace(/\//g, ' ');
  }
};

export type CipherAlgorithm = 'caesar' | 'vigenere' | 'atbash' | 'rot13' | 'morse' | 'reverse';

export const processCipher = (
  algorithm: CipherAlgorithm,
  text: string,
  encrypt: boolean,
  options: { shift?: number; keyword?: string }
): string => {
  switch (algorithm) {
    case 'caesar':
      return caesarCipher(text, options.shift || 3, encrypt);
    case 'vigenere':
      return vigenereCipher(text, options.keyword || 'KEY', encrypt);
    case 'atbash':
      return atbashCipher(text);
    case 'rot13':
      return rot13Cipher(text);
    case 'morse':
      return morseCipher(text, encrypt);
    case 'reverse':
      return reverseCipher(text);
    default:
      return text;
  }
};
