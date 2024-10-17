export const getLength = (s: string) => {
    // Count occurrences of 'a' in the string
    const amp = s.split("").reduce((amp: number, item) => {
        if (item === 'a') {
            return amp + 1;
        }
        return amp;
    }, 0);
    console.log("total", s.length, amp, s)
    if (s.length - amp <=3 )
        return 3;
    return s.length - amp;
}
