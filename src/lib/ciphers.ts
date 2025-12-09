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

export const railFenceCipher = (text: string, rails: number, encrypt: boolean = true): string => {
  if (rails <= 1) return text;
  
  if (encrypt) {
    const fence: string[][] = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1;
    
    for (const char of text) {
      fence[rail].push(char);
      rail += direction;
      if (rail === 0 || rail === rails - 1) direction *= -1;
    }
    
    return fence.map(row => row.join('')).join('');
  } else {
    const fence: (string | null)[][] = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < text.length; i++) {
      fence[rail].push(null);
      rail += direction;
      if (rail === 0 || rail === rails - 1) direction *= -1;
    }
    
    let index = 0;
    for (let r = 0; r < rails; r++) {
      for (let c = 0; c < fence[r].length; c++) {
        if (fence[r][c] === null) {
          fence[r][c] = text[index++];
        }
      }
    }
    
    let result = '';
    rail = 0;
    direction = 1;
    for (let i = 0; i < text.length; i++) {
      result += fence[rail].shift() || '';
      rail += direction;
      if (rail === 0 || rail === rails - 1) direction *= -1;
    }
    
    return result;
  }
};

export const substitutionCipher = (text: string, key: string, encrypt: boolean = true): string => {
  const alphabet = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const upperKey = key.toUpperCase();
  
  if (upperKey.length !== alphabet.length) {
    return text;
  }
  
  return text
    .split('')
    .map(char => {
      const upperChar = char.toUpperCase();
      const index = encrypt 
        ? alphabet.indexOf(upperChar)
        : upperKey.indexOf(upperChar);
      
      if (index === -1) return char;
      
      const newChar = encrypt ? upperKey[index] : alphabet[index];
      return char === char.toUpperCase() ? newChar : newChar.toLowerCase();
    })
    .join('');
};

export const playfairCipher = (text: string, keyword: string, encrypt: boolean = true): string => {
  const prepareText = (t: string) => t.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  const key = prepareText(keyword);
  
  const matrix: string[][] = [];
  const used = new Set<string>();
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  
  for (const char of key + alphabet) {
    if (!used.has(char)) {
      used.add(char);
      if (matrix.length === 0 || matrix[matrix.length - 1].length === 5) {
        matrix.push([]);
      }
      matrix[matrix.length - 1].push(char);
    }
  }
  
  const findPosition = (char: string): [number, number] => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (matrix[i][j] === char) return [i, j];
      }
    }
    return [0, 0];
  };
  
  const prepared = prepareText(text);
  const pairs: string[] = [];
  
  for (let i = 0; i < prepared.length; i += 2) {
    const a = prepared[i];
    let b = prepared[i + 1];
    
    if (!b) b = 'X';
    if (a === b) {
      b = 'X';
      i--;
    }
    pairs.push(a + b);
  }
  
  return pairs
    .map(pair => {
      const [r1, c1] = findPosition(pair[0]);
      const [r2, c2] = findPosition(pair[1]);
      
      if (r1 === r2) {
        const newC1 = encrypt ? (c1 + 1) % 5 : (c1 + 4) % 5;
        const newC2 = encrypt ? (c2 + 1) % 5 : (c2 + 4) % 5;
        return matrix[r1][newC1] + matrix[r2][newC2];
      }
      
      if (c1 === c2) {
        const newR1 = encrypt ? (r1 + 1) % 5 : (r1 + 4) % 5;
        const newR2 = encrypt ? (r2 + 1) % 5 : (r2 + 4) % 5;
        return matrix[newR1][c1] + matrix[newR2][c2];
      }
      
      return matrix[r1][c2] + matrix[r2][c1];
    })
    .join('');
};

export const baconian = (text: string, encrypt: boolean = true): string => {
  const alphabet: { [key: string]: string } = {
    'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
    'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAA',
    'K': 'ABAAB', 'L': 'ABABA', 'M': 'ABABB', 'N': 'ABBAA', 'O': 'ABBAB',
    'P': 'ABBBA', 'Q': 'ABBBB', 'R': 'BAAAA', 'S': 'BAAAB', 'T': 'BAABA',
    'U': 'BAABB', 'V': 'BAABB', 'W': 'BABAA', 'X': 'BABAB', 'Y': 'BABBA',
    'Z': 'BABBB'
  };
  
  if (encrypt) {
    return text
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .split('')
      .map(char => alphabet[char] || '')
      .join(' ');
  } else {
    const reverse: { [key: string]: string } = {};
    Object.keys(alphabet).forEach(key => {
      reverse[alphabet[key]] = key;
    });
    
    return text
      .split(' ')
      .map(code => reverse[code] || '')
      .join('');
  }
};

export const polybius = (text: string, encrypt: boolean = true): string => {
  const square = [
    ['А', 'Б', 'В', 'Г', 'Д'],
    ['Е', 'Ж', 'З', 'И', 'К'],
    ['Л', 'М', 'Н', 'О', 'П'],
    ['Р', 'С', 'Т', 'У', 'Ф'],
    ['Х', 'Ц', 'Ч', 'Ш', 'Щ']
  ];
  
  if (encrypt) {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (square[i][j] === char) {
              return `${i + 1}${j + 1}`;
            }
          }
        }
        return char;
      })
      .join(' ');
  } else {
    return text
      .split(' ')
      .map(code => {
        if (code.length === 2) {
          const row = parseInt(code[0]) - 1;
          const col = parseInt(code[1]) - 1;
          if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            return square[row][col];
          }
        }
        return code;
      })
      .join('');
  }
};

export const bifid = (text: string, key: string, encrypt: boolean = true): string => {
  const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
  const matrix: string[][] = [];
  const used = new Set<string>();
  
  for (const char of (key + alphabet).toUpperCase()) {
    if (!used.has(char) && alphabet.includes(char)) {
      used.add(char);
      if (matrix.length === 0 || matrix[matrix.length - 1].length === 5) {
        matrix.push([]);
      }
      matrix[matrix.length - 1].push(char);
    }
  }
  
  const getCoords = (char: string): [number, number] => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === char) return [i, j];
      }
    }
    return [0, 0];
  };
  
  if (encrypt) {
    const coords = text
      .toUpperCase()
      .split('')
      .filter(c => alphabet.includes(c))
      .map(getCoords);
    
    const rows = coords.map(c => c[0]);
    const cols = coords.map(c => c[1]);
    const combined = [...rows, ...cols];
    
    let result = '';
    for (let i = 0; i < combined.length; i += 2) {
      if (i + 1 < combined.length) {
        result += matrix[combined[i]][combined[i + 1]];
      }
    }
    return result;
  }
  
  return text;
};

export const xorCipher = (text: string, key: string): string => {
  if (!key) return text;
  
  return text
    .split('')
    .map((char, i) => {
      const keyChar = key[i % key.length];
      const xored = char.charCodeAt(0) ^ keyChar.charCodeAt(0);
      return String.fromCharCode(xored);
    })
    .join('');
};

export const base64Cipher = (text: string, encrypt: boolean = true): string => {
  if (encrypt) {
    return btoa(unescape(encodeURIComponent(text)));
  } else {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch {
      return text;
    }
  }
};

export const affine = (text: string, a: number, b: number, encrypt: boolean = true): string => {
  const m = 26;
  const modInverse = (a: number, m: number): number => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1;
  };
  
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpper = char === char.toUpperCase();
        const base = isUpper ? 65 : 97;
        const x = char.charCodeAt(0) - base;
        
        let newX: number;
        if (encrypt) {
          newX = (a * x + b) % m;
        } else {
          const aInv = modInverse(a, m);
          newX = (aInv * (x - b + m)) % m;
        }
        
        return String.fromCharCode(newX + base);
      }
      return char;
    })
    .join('');
};

export const beaufort = (text: string, key: string, encrypt: boolean = true): string => {
  if (!key) return text;
  const upperKey = key.toUpperCase();
  
  let keyIndex = 0;
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpper = char === char.toUpperCase();
        const base = isUpper ? 65 : 97;
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyCode = upperKey[keyIndex % upperKey.length].charCodeAt(0) - 65;
        
        const newCode = (keyCode - charCode + 26) % 26;
        keyIndex++;
        
        return String.fromCharCode(newCode + base);
      }
      return char;
    })
    .join('');
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

export type CipherAlgorithm = 
  | 'caesar' 
  | 'vigenere' 
  | 'atbash' 
  | 'rot13' 
  | 'morse' 
  | 'reverse'
  | 'railfence'
  | 'substitution'
  | 'playfair'
  | 'baconian'
  | 'polybius'
  | 'bifid'
  | 'xor'
  | 'base64'
  | 'affine'
  | 'beaufort';

export const processCipher = (
  algorithm: CipherAlgorithm,
  text: string,
  encrypt: boolean,
  options: { shift?: number; keyword?: string; rails?: number; a?: number; b?: number }
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
    case 'railfence':
      return railFenceCipher(text, options.rails || 3, encrypt);
    case 'substitution':
      return substitutionCipher(
        text, 
        options.keyword || 'БВГДЖЗЙКЛМНПРСТФХЦЧШЩЪЫЬЭЮЯАЕИОУABCDEFGHIJKLMNOPQRSTUVWXYZ', 
        encrypt
      );
    case 'playfair':
      return playfairCipher(text, options.keyword || 'KEYWORD', encrypt);
    case 'baconian':
      return baconian(text, encrypt);
    case 'polybius':
      return polybius(text, encrypt);
    case 'bifid':
      return bifid(text, options.keyword || 'КЛЮЧ', encrypt);
    case 'xor':
      return xorCipher(text, options.keyword || 'KEY');
    case 'base64':
      return base64Cipher(text, encrypt);
    case 'affine':
      return affine(text, options.a || 5, options.b || 8, encrypt);
    case 'beaufort':
      return beaufort(text, options.keyword || 'FORTIFICATION', encrypt);
    default:
      return text;
  }
};