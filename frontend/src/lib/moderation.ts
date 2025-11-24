
const BAD_WORDS = [
    "merde", "connard", "salaud", "putain", "enculé", "batard", "connasse", "salope", "pd", "foutre",
    "shit", "fuck", "asshole", "bitch", "bastard", "cunt", "dick", "pussy"
];

export function moderateInput(text: string): string {
    if (!text) return text;

    let moderatedText = text;
    // Simple regex to replace bad words with asterisks, case insensitive
    BAD_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        moderatedText = moderatedText.replace(regex, '*'.repeat(word.length));
    });

    return moderatedText;
}

export function containsProfanity(text: string): boolean {
    if (!text) return false;
    return BAD_WORDS.some(word => new RegExp(`\\b${word}\\b`, 'i').test(text));
}
