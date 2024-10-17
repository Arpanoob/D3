export const speedToSymbolConverter = (speed: number) => {
    const Symbol = ['d', 'c', 'b', 'a'];
    const values = [2500, 500, 250, 125];//1.25,2.50,5.00,25--(m/s)

    const calm = 'x'
    let result = ""


    if (speed === 0) {
        return calm;
    }

    for (let i = 0; i < values.length; i++) {
        if (speed == 0)
            break;

        while (speed >= values[i]) {
            speed -= values[i]
            result += Symbol[i];
        }
    }

    return result;

}