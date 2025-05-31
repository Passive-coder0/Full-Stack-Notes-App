// Gets first 2 letters of name example : MH
export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i< Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    if (!words[1]) {
        initials = words[0][0] + words[0][1];
    }

    return initials.toUpperCase();
}
