export class Functions{

    setNameEmployee(firstName, secondName, firstSurname, secondSurname): any {
        const valFirstName = firstName ? firstName : '';
        const valSecondName = secondName ? ` ${secondName}` : '';
        const valFirstSurname = firstSurname ? ` ${firstSurname}` : '';
        const valSecondSurname = secondSurname ? ` ${secondSurname}` : '';
        return `${valFirstName}${valSecondName}${valFirstSurname}${valSecondSurname}`;
    }

    validateResponse(items: any): any {
        return JSON.parse(JSON.stringify(items,
            (_key, value) => (value === null) ? '' : value
        ));
    }

}
