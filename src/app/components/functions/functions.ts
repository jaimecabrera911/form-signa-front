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

    validateDate(date): void{
        return date ? date : null;
    }

    validateList(item): void{
        return item ? item : null;
    }

    validateBoolean(item): void{
        return item === null ? false : item;
    }

    validateSelect(item): void{
        return item ? item : null;
    }

}
